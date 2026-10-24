// db.js
// MongoDB connection management.
//
// The server must keep running (and keep serving the React app) when the
// database is unreachable — for example while a MongoDB Atlas Free cluster is
// paused, or while Atlas Network Access blocks the host. So instead of exiting
// on the first failed connect, we retry in the background with exponential
// backoff, report the state through /api/health, and let DB-backed routes
// answer a fast 503 (see `requireDb`) until the connection is up.
const mongoose = require("mongoose");

const READY_STATES = {
  0: "disconnected",
  1: "connected",
  2: "connecting",
  3: "disconnecting",
};

const DEFAULTS = {
  baseDelayMs: 2000,
  maxDelayMs: 60000,
  serverSelectionTimeoutMS: 10000,
};

const state = {
  configured: false,
  attempts: 0,
  stopped: false,
  timer: null,
  listenersAttached: false,
  everConnected: false,
};

// Never let credentials from a connection string reach the logs.
const redact = (message) =>
  String(message || "").replace(
    /mongodb(\+srv)?:\/\/[^\s@/]+@/gi,
    (match, srv) => `mongodb${srv || ""}://<credentials>@`,
  );

const getDbStatus = () => {
  if (!state.configured) return "not_configured";
  return READY_STATES[mongoose.connection.readyState] || "unknown";
};

const isDbConnected = () => mongoose.connection.readyState === 1;

// Exponential backoff with jitter: 2s, 4s, 8s, ... capped at maxDelayMs.
const computeBackoffMs = (attempt, baseDelayMs, maxDelayMs) => {
  const exponential = Math.min(maxDelayMs, baseDelayMs * 2 ** (attempt - 1));
  const jitter = 0.75 + Math.random() * 0.5;
  return Math.round(Math.min(maxDelayMs, exponential * jitter));
};

// Events before the first successful connect duplicate the per-attempt log
// line below, so they are only reported once the app has been connected.
const attachConnectionLogging = (logger) => {
  if (state.listenersAttached) return;
  state.listenersAttached = true;
  const conn = mongoose.connection;
  conn.on("connected", () => {
    state.everConnected = true;
  });
  conn.on("disconnected", () => {
    if (state.everConnected && !state.stopped) {
      logger.warn("[db] MongoDB disconnected — the driver will keep reconnecting");
    }
  });
  conn.on("reconnected", () => logger.log("[db] MongoDB reconnected"));
  // Without an 'error' listener an emitted error would crash the process.
  conn.on("error", (err) => {
    if (state.everConnected) {
      logger.error(`[db] MongoDB connection error: ${redact(err && err.message)}`);
    }
  });
};

// Starts connecting in the background and resolves once connected (true), or
// when retrying is stopped / MONGODB_URI is missing (false). Never rejects.
const connectWithRetry = (uri, options = {}) => {
  const {
    baseDelayMs = DEFAULTS.baseDelayMs,
    maxDelayMs = DEFAULTS.maxDelayMs,
    serverSelectionTimeoutMS = DEFAULTS.serverSelectionTimeoutMS,
    logger = console,
  } = options;

  if (!uri) {
    state.configured = false;
    logger.error(
      "[db] MONGODB_URI is not set — the site will be served without a database. " +
        "Set MONGODB_URI (Render dashboard → Environment, or backend/.env locally) and restart.",
    );
    return Promise.resolve(false);
  }

  state.configured = true;
  state.stopped = false;
  state.attempts = 0;
  attachConnectionLogging(logger);

  return new Promise((resolve) => {
    const attempt = async () => {
      if (state.stopped) return resolve(false);
      state.attempts += 1;
      try {
        await mongoose.connect(uri, { serverSelectionTimeoutMS });
        logger.log(
          `[db] Connected to MongoDB (database: ${mongoose.connection.name}) after ${state.attempts} attempt(s)`,
        );
        return resolve(true);
      } catch (err) {
        if (state.stopped) return resolve(false);
        const delay = computeBackoffMs(state.attempts, baseDelayMs, maxDelayMs);
        logger.error(
          `[db] MongoDB connection attempt ${state.attempts} failed: ${redact(err && err.message)} ` +
            `— retrying in ${(delay / 1000).toFixed(1)}s`,
        );
        if (state.attempts === 1 || state.attempts % 10 === 0) {
          logger.error(
            "[db] Hint: if this is a MongoDB Atlas Free cluster, check that it is not paused " +
              "(Atlas pauses Free clusters after 30 days without connections) and that " +
              "Network Access allows this host (0.0.0.0/0 for Render).",
          );
        }
        state.timer = setTimeout(attempt, delay);
        if (typeof state.timer.unref === "function") state.timer.unref();
      }
    };
    attempt();
  });
};

const withTimeout = (promise, ms, label) => {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
};

// Round-trips a real command to the server. Throws when not connected or when
// the server does not answer in time.
const pingDb = async ({ timeoutMs = 3000 } = {}) => {
  if (!isDbConnected() || !mongoose.connection.db) {
    throw new Error(`database is ${getDbStatus()}`);
  }
  const startedAt = Date.now();
  await withTimeout(mongoose.connection.db.admin().ping(), timeoutMs, "ping");
  return { latencyMs: Date.now() - startedAt };
};

// Express middleware for DB-backed routes: answer a clean 503 right away
// instead of letting the request hang on Mongoose's command buffer.
const requireDb = (req, res, next) => {
  if (isDbConnected()) return next();
  res.set("Retry-After", "30");
  return res.status(503).json({
    code: "DB_UNAVAILABLE",
    message: "The database is temporarily unavailable. Please try again in a minute.",
  });
};

const stopRetrying = () => {
  state.stopped = true;
  if (state.timer) clearTimeout(state.timer);
  state.timer = null;
};

const disconnectDb = async () => {
  stopRetrying();
  await mongoose.disconnect();
};

module.exports = {
  connectWithRetry,
  disconnectDb,
  getDbStatus,
  isDbConnected,
  pingDb,
  requireDb,
  stopRetrying,
  redact,
  computeBackoffMs,
};
