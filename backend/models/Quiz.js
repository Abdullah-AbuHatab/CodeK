// models/Quiz.js
const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  id: Number,
  question: String,
  options: [String],
  answer: String,
});

const quizSchema = new mongoose.Schema({
  courseId: { type: String, required: true }, // مثال: "web-101"
  questions: [questionSchema],
});

module.exports = mongoose.model("Quiz", quizSchema);
