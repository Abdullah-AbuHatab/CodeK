// scripts/fixCourseIds.js
// One-off maintenance: give courses whose quiz references them by MongoDB
// _id a matching custom `id`. Run from backend/: node scripts/fixCourseIds.js
const path = require("path");
const mongoose = require("mongoose");
const Course = require("../models/Course");
const Quiz = require("../models/Quiz");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

async function fixCourseIds() {
  await mongoose.connect(process.env.MONGODB_URI);
  const quizzes = await Quiz.find();
  let updated = 0;
  for (const quiz of quizzes) {
    // Find course by _id or id
    let course = await Course.findOne({ id: quiz.courseId });
    if (!course) {
      // Try to find by MongoDB _id
      course = await Course.findById(quiz.courseId).catch(() => null);
      if (course) {
        // Set the course.id to match quiz.courseId
        course.id = quiz.courseId;
        await course.save();
        updated++;
        console.log(`Updated course _id=${course._id} to id=${quiz.courseId}`);
      }
    }
  }
  console.log(`Done. Updated ${updated} courses.`);
  mongoose.disconnect();
}

fixCourseIds().catch((err) => {
  console.error("fixCourseIds failed:", err.message);
  mongoose.disconnect();
  process.exitCode = 1;
});
