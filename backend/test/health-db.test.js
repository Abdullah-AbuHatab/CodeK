// Liveness vs. deep DB health, fast 503s while the DB is down, and recovery
// through the background retry loop once MongoDB becomes reachable.
require("./helpers/env");
const { test, before, after } = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");

const { app } = require("../server");
const db = require("../db");
const User = require("../models/User");
const { getFreePort, startMongo, silentLogger } = require("./helpers/mongo");

let port;
let mongo;
let connected;

before(async () => {
  port = await getFreePort();
  // Nothing listens on `port` yet: every attempt fails until Mongo starts.
  connected = db.connectWithRetry(`mongodb://127.0.0.1:${port}/codek-test`, {
    baseDelayMs: 100,
    maxDelayMs: 300,
    serverSelectionTimeoutMS: 300,
    logger: silentLogger,
  });
});

after(async () => {
  await db.disconnectDb();
  if (mongo) await mongo.stop();
});

test("GET /api/health is 200 and reports the DB state while the DB is down", async () => {
  const res = await request(app).get("/api/health");
  assert.equal(res.status, 200);
  assert.equal(res.body.status, "OK");
  assert.ok(["disconnected", "connecting"].includes(res.body.db), res.body.db);
});

test("GET /api/health/db is 503 while the DB is down", async () => {
  const res = await request(app).get("/api/health/db");
  assert.equal(res.status, 503);
  assert.equal(res.body.code, "DB_UNAVAILABLE");
  assert.equal(res.headers["retry-after"], "30");
});

test("DB-backed routes answer a fast 503 instead of hanging while the DB is down", async () => {
  const started = Date.now();
  const res = await request(app).get("/api/courses/public/all");
  const elapsed = Date.now() - started;
  assert.equal(res.status, 503);
  assert.deepEqual(res.body, {
    code: "DB_UNAVAILABLE",
    message: "The database is temporarily unavailable. Please try again in a minute.",
  });
  assert.ok(elapsed < 1000, `took ${elapsed}ms`);

  const login = await request(app)
    .post("/api/auth/login")
    .send({ username: "someone", password: "whatever1" });
  assert.equal(login.status, 503);

  const quiz = await request(app).get("/api/quizzes/web-101");
  assert.equal(quiz.status, 503);
});

test("the retry loop connects once MongoDB comes up; deep health turns 200", async () => {
  mongo = await startMongo(port);
  assert.equal(await connected, true);
  assert.equal(db.getDbStatus(), "connected");

  const health = await request(app).get("/api/health");
  assert.equal(health.status, 200);
  assert.equal(health.body.db, "connected");

  const deep = await request(app).get("/api/health/db");
  assert.equal(deep.status, 200);
  assert.equal(deep.body.status, "OK");
  assert.equal(typeof deep.body.latencyMs, "number");

  const courses = await request(app).get("/api/courses/public/all");
  assert.equal(courses.status, 200);
  assert.deepEqual(courses.body, []);
});

test("unique indexes are still built when the first connection attempts failed", async () => {
  await User.init();
  const indexes = await User.collection.indexes();
  const unique = indexes.filter((i) => i.unique).map((i) => i.name).sort();
  assert.deepEqual(unique, ["email_1", "username_1"]);
});

test("unknown API routes still 404 once connected", async () => {
  const res = await request(app).get("/api/does-not-exist");
  assert.equal(res.status, 404);
});
