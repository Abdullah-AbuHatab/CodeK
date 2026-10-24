// seedData.js
// Kept for backward compatibility — delegates to the idempotent seeder.
// Seeds courses, university subjects and quizzes. It no longer wipes the
// collections first: missing documents are inserted, existing ones are kept
// (pass --overwrite to reset them to the repo's values).
// Prefer `npm run seed`, which also seeds the admin user.
const { runCli } = require("./scripts/seed");

runCli(["--only=courses,subjects,quizzes", ...process.argv.slice(2)]).then((code) =>
  process.exit(code),
);
