// The idempotent seeder on an empty database, then reads through the API.
require("./helpers/env");
const { test, before, after } = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
const mongoose = require("mongoose");

const { app } = require("../server");
const { seedAll, seedAdmin, loadSeedData, parseArgs } = require("../scripts/seed");
const Course = require("../models/Course");
const UniversitySubject = require("../models/UniversitySubject");
const Quiz = require("../models/Quiz");
const User = require("../models/User");
const { startMongo, silentLogger } = require("./helpers/mongo");

const ADMIN_ENV = {
  ADMIN_USERNAME: "codek-admin",
  ADMIN_PASSWORD: "a-long-test-password-123",
  ADMIN_EMAIL: "Admin@Example.com",
  ADMIN_FULLNAME: "Test Admin",
};

let mongo;
let data;

before(async () => {
  mongo = await startMongo();
  await mongoose.connect(mongo.getUri("codek-seed-test"));
  data = await loadSeedData();
});

after(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

const counts = async () => ({
  courses: await Course.countDocuments(),
  subjects: await UniversitySubject.countDocuments(),
  quizzes: await Quiz.countDocuments(),
  admins: await User.countDocuments({ role: "admin" }),
});

test("loads the frontend ES-module data files", () => {
  assert.ok(data.COURSES.length > 0);
  assert.ok(data.UNIVERSITY_SUBJECTS.length > 0);
  assert.ok(Object.keys(data.QUIZZES).length > 0);
});

test("every quiz answer matches one of its options (Quiz.js grades by exact text)", () => {
  const mismatches = Object.entries(data.QUIZZES).flatMap(([quizId, questions]) =>
    questions.filter((q) => !q.options.includes(q.answer)).map((q) => `${quizId}#${q.id}`),
  );
  // Wireless-Networks#14 is an ordering question flattened into single-item
  // options; it needs a content decision, so it is the one known exception.
  assert.deepEqual(mismatches, ["Wireless-Networks#14"]);
});

test("seeds an empty database and is idempotent on a second run", async () => {
  const first = await seedAll({ env: ADMIN_ENV, logger: silentLogger });
  const expected = {
    courses: data.COURSES.length,
    subjects: data.UNIVERSITY_SUBJECTS.length,
    quizzes: Object.keys(data.QUIZZES).length,
    admins: 1,
  };
  assert.deepEqual(await counts(), expected);
  assert.equal(first.courses.inserted, expected.courses);
  assert.equal(first.admin.status, "created");

  const second = await seedAll({ env: ADMIN_ENV, logger: silentLogger });
  assert.deepEqual(await counts(), expected);
  assert.equal(second.courses.inserted, 0);
  assert.equal(second.quizzes.unchanged, expected.quizzes);
  assert.equal(second.admin.status, "unchanged");
});

test("keeps dashboard edits unless --overwrite is given", async () => {
  await Course.updateOne({ id: "web-101" }, { title: "Edited in the dashboard" });
  await seedAll({ only: ["courses"], logger: silentLogger });
  assert.equal((await Course.findOne({ id: "web-101" })).title, "Edited in the dashboard");

  await seedAll({ only: ["courses"], overwrite: true, logger: silentLogger });
  const original = data.COURSES.find((c) => c.id === "web-101");
  assert.equal((await Course.findOne({ id: "web-101" })).title, original.title);
});

test("admin seeding needs all three env vars, a real password, and stores a hash", async () => {
  assert.equal((await seedAdmin({ env: {}, logger: silentLogger })).status, "skipped");
  await assert.rejects(
    seedAdmin({ env: { ADMIN_USERNAME: "x" }, logger: silentLogger }),
    /must all be set/,
  );
  await assert.rejects(
    seedAdmin({ env: { ...ADMIN_ENV, ADMIN_PASSWORD: "short" }, logger: silentLogger }),
    /at least 12/,
  );
  await assert.rejects(
    seedAdmin({
      env: { ...ADMIN_ENV, ADMIN_PASSWORD: "change_me_to_a_strong_password" },
      logger: silentLogger,
    }),
    /placeholder/,
  );
  const admin = await User.findOne({ username: ADMIN_ENV.ADMIN_USERNAME });
  assert.notEqual(admin.password, ADMIN_ENV.ADMIN_PASSWORD);
  assert.match(admin.password, /^\$2[aby]\$12\$/);
  assert.equal(admin.email, "admin@example.com");
});

test("parses CLI flags and rejects unknown steps", () => {
  assert.deepEqual(parseArgs(["--only=quizzes,admin", "--overwrite"]), {
    only: ["quizzes", "admin"],
    overwrite: true,
  });
  assert.throws(() => parseArgs(["--only=everything"]), /--only accepts/);
  assert.throws(() => parseArgs(["--wipe"]), /Unknown argument/);
});

test("seeded courses and quizzes are readable through the public API", async () => {
  const courses = await request(app).get("/api/courses/public/all");
  assert.equal(courses.status, 200);
  assert.equal(courses.body.length, data.COURSES.length);
  assert.ok(courses.body.some((c) => c.id === "web-101"));

  const quiz = await request(app).get("/api/quizzes/web-101");
  assert.equal(quiz.status, 200);
  assert.equal(quiz.body.courseId, "web-101");
  assert.equal(quiz.body.questions.length, data.QUIZZES["web-101"].length);
  assert.ok(quiz.body.questions.every((q) => q._id && q.question && q.options.length));

  const missing = await request(app).get("/api/quizzes/no-such-course");
  assert.equal(missing.status, 404);
});

test("the seeded admin can log in and manage quiz questions", async () => {
  const login = await request(app)
    .post("/api/auth/login")
    .send({ username: ADMIN_ENV.ADMIN_USERNAME, password: ADMIN_ENV.ADMIN_PASSWORD });
  assert.equal(login.status, 200);
  assert.equal(login.body.user.role, "admin");
  const auth = { Authorization: `Bearer ${login.body.token}` };

  const questions = await request(app).get("/api/courses/web-101/questions").set(auth);
  assert.equal(questions.status, 200);
  const first = questions.body[0];

  // The admin UI sends the whole question object back when editing.
  const edited = { ...first, question: "Edited question text?" };
  const put = await request(app)
    .put(`/api/courses/web-101/questions/${first._id}`)
    .set(auth)
    .send(edited);
  assert.equal(put.status, 200);
  assert.equal(put.body.question, "Edited question text?");

  const after = await request(app).get("/api/courses/web-101/questions").set(auth);
  const stored = after.body.find((q) => q._id === first._id);
  assert.ok(stored, "question keeps its _id after an edit");
  assert.equal(stored.question, "Edited question text?");
  assert.deepEqual(stored.options, first.options);

  const submit = await request(app)
    .post("/api/quiz/submit")
    .set(auth)
    .send({ courseId: "web-101", score: 1, total: 10 });
  assert.equal(submit.status, 403, "admins cannot submit quizzes, whatever their username");
});
