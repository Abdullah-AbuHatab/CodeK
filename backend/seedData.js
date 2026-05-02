// seedData.js
const mongoose = require("mongoose");
const Course = require("./models/Course");
const UniversitySubject = require("./models/UniversitySubject");
const Quiz = require("./models/Quiz");
require("dotenv").config();

// Import data from frontend
const { COURSES } = require("../src/data/coursesData");
const { UNIVERSITY_SUBJECTS } = require("../src/data/universitySubjectsData");
const { QUIZZES } = require("./data/quizData");

async function seedData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Clear existing data
    await Course.deleteMany({});
    await UniversitySubject.deleteMany({});
    await Quiz.deleteMany({});

    console.log("Cleared existing data");

    // Seed courses
    const coursesToInsert = COURSES.map((course) => ({
      ...course,
      isUniversity: false,
    }));

    await Course.insertMany(coursesToInsert);
    console.log(`Seeded ${coursesToInsert.length} courses`);

    // Seed university subjects
    const universitySubjectsToInsert = UNIVERSITY_SUBJECTS.map((subject) => ({
      ...subject,
      isUniversity: true,
    }));

    await UniversitySubject.insertMany(universitySubjectsToInsert);
    console.log(
      `Seeded ${universitySubjectsToInsert.length} university subjects`,
    );

    // Seed quizzes
    for (const courseId in QUIZZES) {
      const questions = QUIZZES[courseId];
      await Quiz.create({ courseId, questions });
    }
    console.log("Seeded quizzes");

    console.log("All data seeded successfully!");
    mongoose.disconnect();
  } catch (error) {
    console.error("Seeding error:", error);
    mongoose.disconnect();
    process.exit(1);
  }
}

seedData();
