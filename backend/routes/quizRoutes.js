// routes/quizRoutes.js
const express = require("express");
const Quiz = require("../models/Quiz");

const router = express.Router();

// جلب quiz حسب courseId (PUBLIC)
router.get("/:courseId", async (req, res) => {
  try {
    console.log(`🔍 Fetching quiz for courseId: ${req.params.courseId}`);
    const quiz = await Quiz.findOne({ courseId: req.params.courseId });

    if (!quiz) {
      console.log(`❌ Quiz not found for courseId: ${req.params.courseId}`);
      return res.status(404).json({ message: "Quiz not found" });
    }

    console.log(`✅ Quiz found with ${quiz.questions?.length || 0} questions`);
    res.json(quiz);
  } catch (err) {
    console.error("Quiz fetch error:", err);
    // Do not echo internal error text to the client.
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
