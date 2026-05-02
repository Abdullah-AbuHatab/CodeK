// fixCourseIds.js
const mongoose = require("mongoose");
const Course = require("./models/Course");
const Quiz = require("./models/Quiz");
require("dotenv").config();

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

fixCourseIds();
