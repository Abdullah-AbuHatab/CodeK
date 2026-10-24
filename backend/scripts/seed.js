// scripts/seed.js
// One idempotent command that (re)creates everything the app needs on an
// empty database: courses, university subjects, quizzes and the admin user.
//
//   npm run seed                      # insert whatever is missing
//   npm run seed -- --overwrite       # also reset seeded documents to the repo's values
//   npm run seed -- --only=quizzes    # one or more of: courses,subjects,quizzes,admin
//
// Safe to run any number of times: documents are matched by their natural key
// (course/subject `id`, quiz `courseId`, admin `username`). Without
// --overwrite, existing documents — including edits made in the admin
// dashboard — are left untouched. Nothing is ever deleted.
//
// Required env: MONGODB_URI. Admin env (all three or none):
// ADMIN_USERNAME, ADMIN_PASSWORD (12+ chars), ADMIN_EMAIL; optional
// ADMIN_FULLNAME, ADMIN_PHONE. No credentials are hard-coded here.
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Course = require("../models/Course");
const UniversitySubject = require("../models/UniversitySubject");
const Quiz = require("../models/Quiz");
const User = require("../models/User");
const { redact } = require("../db");

const STEPS = ["courses", "subjects", "quizzes", "admin"];
const REPO_ROOT = path.join(__dirname, "..", "..");
const ADMIN_PASSWORD_MIN_LENGTH = 12;
const PLACEHOLDER_PASSWORD = /change_me|replace_me|^password$|^admin$/i;

// src/data/*.js are ES modules owned by the React app. Import them through a
// data: URL so this works on every supported Node version without a build
// step (plain require() of ESM syntax only works on newer Node releases).
async function importEsmDataFile(relativePath) {
  const absolutePath = path.join(REPO_ROOT, relativePath);
  const source = await fs.promises.readFile(absolutePath, "utf8");
  if (/^\s*import\s/m.test(source)) {
    throw new Error(
      `${relativePath} contains import statements; the seed loader only supports self-contained data modules`,
    );
  }
  const url = `data:text/javascript;base64,${Buffer.from(source).toString("base64")}`;
  return import(url);
}

async function loadSeedData() {
  const [{ COURSES }, { UNIVERSITY_SUBJECTS }] = await Promise.all([
    importEsmDataFile("src/data/coursesData.js"),
    importEsmDataFile("src/data/universitySubjectsData.js"),
  ]);
  const { QUIZZES } = require("../data/quizData");
  return { COURSES, UNIVERSITY_SUBJECTS, QUIZZES };
}

// Insert missing documents; with `overwrite`, reset existing ones too.
async function upsertByKey(Model, docs, key, { overwrite = false } = {}) {
  const result = { inserted: 0, overwritten: 0, unchanged: 0 };
  for (const data of docs) {
    const existing = await Model.findOne({ [key]: data[key] });
    if (!existing) {
      await Model.create(data);
      result.inserted += 1;
    } else if (overwrite) {
      existing.overwrite(data);
      await existing.save();
      result.overwritten += 1;
    } else {
      result.unchanged += 1;
    }
  }
  return result;
}

async function seedCourses(data, options) {
  const docs = data.COURSES.map((course) => ({ ...course, isUniversity: false }));
  return upsertByKey(Course, docs, "id", options);
}

async function seedUniversitySubjects(data, options) {
  return upsertByKey(UniversitySubject, data.UNIVERSITY_SUBJECTS, "id", options);
}

async function seedQuizzes(data, options) {
  const docs = Object.entries(data.QUIZZES).map(([courseId, questions]) => ({
    courseId,
    questions,
  }));
  return upsertByKey(Quiz, docs, "courseId", options);
}

function readAdminEnv(env) {
  const username = (env.ADMIN_USERNAME || "").trim();
  const password = env.ADMIN_PASSWORD || "";
  const email = (env.ADMIN_EMAIL || "").trim().toLowerCase();
  const fullName = (env.ADMIN_FULLNAME || "").trim() || "Admin User";
  const phone = (env.ADMIN_PHONE || "").trim() || "0000000000";
  return { username, password, email, fullName, phone };
}

// Creates the admin, or brings an existing one in line with the env values.
// Returns { status: "created" | "updated" | "unchanged" | "skipped" }.
async function seedAdmin({ env = process.env, logger = console } = {}) {
  const admin = readAdminEnv(env);

  if (!admin.username && !admin.password && !admin.email) {
    logger.warn(
      "[seed] Skipping admin user: ADMIN_USERNAME, ADMIN_PASSWORD and ADMIN_EMAIL are not set.",
    );
    return { status: "skipped" };
  }
  if (!admin.username || !admin.password || !admin.email) {
    throw new Error(
      "ADMIN_USERNAME, ADMIN_PASSWORD and ADMIN_EMAIL must all be set to seed the admin user",
    );
  }
  if (admin.password.length < ADMIN_PASSWORD_MIN_LENGTH) {
    throw new Error(
      `ADMIN_PASSWORD must be at least ${ADMIN_PASSWORD_MIN_LENGTH} characters`,
    );
  }
  if (PLACEHOLDER_PASSWORD.test(admin.password)) {
    throw new Error("ADMIN_PASSWORD still holds the placeholder value from .env.example");
  }

  try {
    const existing = await User.findOne({ username: admin.username });
    if (!existing) {
      await User.create({
        username: admin.username,
        password: await bcrypt.hash(admin.password, 12),
        fullName: admin.fullName,
        email: admin.email,
        phone: admin.phone,
        role: "admin",
        courses: [],
        quizResults: [],
      });
      return { status: "created" };
    }

    let changed = false;
    if (existing.role !== "admin") {
      existing.role = "admin";
      changed = true;
    }
    if (existing.email !== admin.email) {
      existing.email = admin.email;
      changed = true;
    }
    if (env.ADMIN_FULLNAME && existing.fullName !== admin.fullName) {
      existing.fullName = admin.fullName;
      changed = true;
    }
    if (!(await bcrypt.compare(admin.password, existing.password))) {
      existing.password = await bcrypt.hash(admin.password, 12);
      changed = true;
    }
    if (changed) await existing.save();
    return { status: changed ? "updated" : "unchanged" };
  } catch (err) {
    if (err && err.code === 11000) {
      throw new Error(
        "ADMIN_EMAIL (or ADMIN_USERNAME) is already used by another account",
      );
    }
    throw err;
  }
}

// Runs the selected steps against the current mongoose connection.
async function seedAll({
  only = STEPS,
  overwrite = false,
  env = process.env,
  logger = console,
} = {}) {
  const data = await loadSeedData();
  const summary = {};

  if (only.includes("courses")) {
    summary.courses = await seedCourses(data, { overwrite });
    logger.log(`[seed] courses: ${JSON.stringify(summary.courses)}`);
  }
  if (only.includes("subjects")) {
    summary.subjects = await seedUniversitySubjects(data, { overwrite });
    logger.log(`[seed] university subjects: ${JSON.stringify(summary.subjects)}`);
  }
  if (only.includes("quizzes")) {
    summary.quizzes = await seedQuizzes(data, { overwrite });
    logger.log(`[seed] quizzes: ${JSON.stringify(summary.quizzes)}`);
  }
  if (only.includes("admin")) {
    summary.admin = await seedAdmin({ env, logger });
    logger.log(`[seed] admin user: ${summary.admin.status}`);
  }
  return summary;
}

function parseArgs(argv) {
  const options = { only: STEPS, overwrite: false };
  for (const arg of argv) {
    if (arg === "--overwrite") {
      options.overwrite = true;
    } else if (arg.startsWith("--only=")) {
      const steps = arg
        .slice("--only=".length)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const unknown = steps.filter((s) => !STEPS.includes(s));
      if (unknown.length || steps.length === 0) {
        throw new Error(`--only accepts: ${STEPS.join(",")} (got "${unknown.join(",")}")`);
      }
      options.only = steps;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return options;
}

async function runCli(argv = process.argv.slice(2)) {
  require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

  let options;
  try {
    options = parseArgs(argv);
  } catch (err) {
    console.error(`❌ ${err.message}`);
    return 1;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("❌ MONGODB_URI is not set (backend/.env or the shell environment).");
    return 1;
  }

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 15000 });
    console.log(`✅ Connected to MongoDB (database: ${mongoose.connection.name})`);
    await seedAll(options);
    console.log("✅ Seeding finished");
    return 0;
  } catch (err) {
    console.error(`❌ Seeding failed: ${redact(err && err.message)}`);
    return 1;
  } finally {
    await mongoose.disconnect().catch(() => {});
  }
}

if (require.main === module) {
  runCli().then((code) => process.exit(code));
}

module.exports = {
  STEPS,
  loadSeedData,
  seedAll,
  seedAdmin,
  seedCourses,
  seedQuizzes,
  seedUniversitySubjects,
  parseArgs,
  runCli,
};
