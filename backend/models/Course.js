// models/Course.js
const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced", "All"],
    default: "Beginner",
  },
  duration: { type: String },
  badge: { type: String },
  shortDescription: { type: String },
  longDescription: { type: String },
  prerequisitesShort: { type: String },
  topics: [{ type: String }],
  objectives: [{ type: String }],
  assessmentInstructions: { type: String },
  assessment: {
    numQuestions: { type: Number, default: 10 },
    estimatedTime: { type: String, default: "15-20 min" },
    analysis: { type: Boolean, default: true },
    aiRecommendations: { type: Boolean, default: true },
  },
  isUniversity: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Course", courseSchema);
