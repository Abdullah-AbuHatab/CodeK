// seedAdmin.js
// Creates (or updates) the initial admin user using credentials from .env.
// Run once with: `node seedAdmin.js`
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  name: { type: String },
  role: { type: String, enum: ["student", "admin"], default: "student" },
  courses: [{ type: String }],
  quizResults: [
    {
      courseId: String,
      score: Number,
      total: Number,
      date: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

(async () => {
  const {
    MONGODB_URI,
    ADMIN_USERNAME,
    ADMIN_PASSWORD,
    ADMIN_FULLNAME,
    ADMIN_EMAIL,
  } = process.env;

  if (!MONGODB_URI || !ADMIN_USERNAME || !ADMIN_PASSWORD || !ADMIN_EMAIL) {
    console.error(
      "❌ Missing env vars. Required: MONGODB_URI, ADMIN_USERNAME, ADMIN_PASSWORD, ADMIN_EMAIL",
    );
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

    const existing = await User.findOne({ username: ADMIN_USERNAME });

    if (existing) {
      existing.password = hashedPassword;
      existing.fullName = ADMIN_FULLNAME || existing.fullName;
      existing.email = ADMIN_EMAIL;
      existing.role = "admin";
      await existing.save();
      console.log(`✅ Admin user '${ADMIN_USERNAME}' updated`);
    } else {
      await User.create({
        username: ADMIN_USERNAME,
        password: hashedPassword,
        fullName: ADMIN_FULLNAME || "Admin User",
        email: ADMIN_EMAIL,
        phone: "0000000000",
        role: "admin",
        courses: [],
        quizResults: [],
      });
      console.log(`✅ Admin user '${ADMIN_USERNAME}' created`);
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed admin failed:", err.message);
    process.exit(1);
  }
})();
