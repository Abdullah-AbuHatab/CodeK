// seedAdmin.js
// Kept for backward compatibility — delegates to the idempotent seeder.
// Creates or updates the admin user from ADMIN_USERNAME / ADMIN_PASSWORD /
// ADMIN_EMAIL (backend/.env). Prefer `npm run seed`, which seeds everything.
const { runCli } = require("./scripts/seed");

runCli(["--only=admin", ...process.argv.slice(2)]).then((code) => process.exit(code));
