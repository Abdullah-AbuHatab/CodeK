// seedQuizzes.js
// Kept for backward compatibility — delegates to the idempotent seeder.
// Seeds the quizzes from backend/data/quizData.js without deleting existing
// ones (pass --overwrite to reset seeded quizzes to the repo's questions).
const { runCli } = require("./scripts/seed");

runCli(["--only=quizzes", ...process.argv.slice(2)]).then((code) => process.exit(code));
