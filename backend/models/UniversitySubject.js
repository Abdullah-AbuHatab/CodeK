// models/UniversitySubject.js
const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema(
  {
    id: { type: String },
    title: { type: String },
    file: { type: String },
  },
  { strict: false },
); // Allow flexible schema

const universitySubjectSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  semester: { type: String },
  badge: { type: String },
  longDescription: { type: String },
  chapters: [mongoose.Schema.Types.Mixed], // Allow mixed types (strings or objects)
  objectives: [{ type: String }],
  prerequisites: { type: String },
  quiz: {
    numQuestions: { type: Number, default: 15 },
    estimatedTime: { type: String, default: "20-30 min" },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("UniversitySubject", universitySubjectSchema);
