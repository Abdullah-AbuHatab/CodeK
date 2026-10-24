// models/User.js
// Shared by server.js and the seed scripts (previously defined twice).
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  name: { type: String }, // Kept for backward compatibility
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

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
