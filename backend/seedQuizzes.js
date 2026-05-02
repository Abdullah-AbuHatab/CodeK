// seedQuizzes.js
const mongoose = require("mongoose");
const Quiz = require("./models/Quiz");
require("dotenv").config();

const { QUIZZES } = require("./data/quizData");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("Connected to MongoDB");

    // مسح الـ quizzes القديمة
    await Quiz.deleteMany({});

    // حفظ كل quiz
    for (const courseId in QUIZZES) {
      const questions = QUIZZES[courseId];
      await Quiz.create({ courseId, questions });
    }

    console.log("All quizzes seeded!");
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error(err);
  });
