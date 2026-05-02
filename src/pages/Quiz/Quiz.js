import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { quizService } from "../../services/quizService";
import { QuizContext } from "../../context/QuizContext";
import "./Quiz.css";

export default function Quiz() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsQuizActive } = useContext(QuizContext);

  // جلب البيانات من Backend
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [answersReview, setAnswersReview] = useState([]);

  // AI Hints والتحليل
  const [aiHelp, setAiHelp] = useState("");
  const [showHelp, setShowHelp] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState("");
  const [loadingHelp, setLoadingHelp] = useState(false);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

  // Select 10 random questions from the pool without duplicates
  const selectRandomQuestions = (allQuestions, limit = 10) => {
    if (allQuestions.length <= limit) {
      return allQuestions;
    }

    const selectedIndices = new Set();
    const selectedQuestions = [];

    while (selectedQuestions.length < limit) {
      const randomIndex = Math.floor(Math.random() * allQuestions.length);
      if (!selectedIndices.has(randomIndex)) {
        selectedIndices.add(randomIndex);
        selectedQuestions.push(allQuestions[randomIndex]);
      }
    }

    return selectedQuestions;
  };

  // جلب الأسئلة من Backend
  useEffect(() => {
    const fetchQuiz = async () => {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user || user.role !== "student") {
        navigate("/login", { state: { from: location.pathname } });
        return;
      }

      try {
        const data = await quizService.getQuiz(courseId);
        if (data.questions && data.questions.length > 0) {
          // Select only 10 random questions from the pool
          const selectedQuestions = selectRandomQuestions(data.questions, 10);
          const questions = shuffleArray(selectedQuestions).map((q) => ({
            ...q,
            options: shuffleArray(q.options),
          }));
          setShuffledQuestions(questions);
          // Quiz is now active - disable chatbot
          setIsQuizActive(true);
        } else {
          setShuffledQuestions([]);
        }
      } catch (error) {
        console.error("Failed to load quiz:", error);
        setShuffledQuestions([]);
      }
    };

    fetchQuiz();
  }, [courseId, navigate, location.pathname, setIsQuizActive]);

  // Cleanup - re-enable chatbot when component unmounts or quiz is finished
  useEffect(() => {
    return () => {
      setIsQuizActive(false);
    };
  }, [setIsQuizActive]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  // الحصول على AI Hint
  const getAiHelp = async () => {
    if (loadingHelp) return;
    setLoadingHelp(true);
    setShowHelp(true);
    setAiHelp("AI Tutor is thinking... 🤖");

    try {
      const question = shuffledQuestions[currentIndex];
      const prompt = `You are a helpful coding tutor. 
Question: "${question.question}"
Options: ${question.options.join(", ")}

Provide a SHORT, one-sentence hint in English to help the student find the correct answer WITHOUT directly naming it or giving the answer away. Be encouraging and guide them to think critically.`;

      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      setAiHelp(data.response || data.reply || "Could not retrieve hint");
    } catch (error) {
      console.error("AI Help Error:", error);
      setAiHelp("Could not retrieve hint. Please try again.");
    } finally {
      setLoadingHelp(false);
    }
  };

  // توليد التحليل النهائي
  const generateFinalAnalysis = async (review, finalScore) => {
    setLoadingAnalysis(true);
    try {
      const total = review.length;

      // 1. استخراج الأخطاء
      const mistakes = review
        .filter((a) => !a.isCorrect)
        .map(
          (a) =>
            `- Question: "${a.question}"\n   Correct answer: "${a.correct}"`,
        )
        .join("\n\n");

      // 2. استخراج النقاط القوية (الأسئلة الصحيحة)
      const correctQuestions = review
        .filter((a) => a.isCorrect)
        .map((a) => `- ${a.question}`)
        .join("\n");

      const correctCount = review.filter((a) => a.isCorrect).length;
      const wrongCount = review.filter((a) => !a.isCorrect).length;
      const percentage = Math.round((finalScore / total) * 100);

      const prompt = `You are an expert educational AI. Analyze this student's quiz performance.

QUIZ RESULTS:
- Score: ${finalScore}/${total} (${percentage}%)

${correctQuestions ? `CORRECTLY ANSWERED QUESTIONS (Strengths):\n${correctQuestions}\n` : ""}
${mistakes ? `MISTAKES (Areas to improve):\n${mistakes}\n` : "NO MISTAKES - PERFECT SCORE!\n"}

Please provide a detailed analysis in this format:

1. Performance Level : [Beginner/Intermediate/Advanced]
2.  Strengths : Based on the specific "CORRECTLY ANSWERED QUESTIONS" listed above, identify the specific programming topics or concepts the student has mastered. Be specific (e.g., "You have a solid grasp of Loop logic and Array methods").
3. Areas for Improvement : Based on the mistakes, mention the specific topics they struggled with.
4. Personalized Learning Roadmap (3-5 steps):
   - Step 1: [specific action]
   - Step 2: [specific action]
   - Step 3: [specific action]
5. Motivation : Encouraging message.

Keep the analysis concise, professional, and actionable.`;

      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      setAiAnalysis(data.response || data.reply || "Analysis unavailable");
    } catch (error) {
      console.error("Analysis Error:", error);
      setAiAnalysis("Analysis currently unavailable.");
    } finally {
      setLoadingAnalysis(false);
    }
  };

  const handleNext = async () => {
    if (!selectedOption) return;

    const currentQuestion = shuffledQuestions[currentIndex];
    const isCorrect = selectedOption === currentQuestion.answer;
    const newScore = isCorrect ? score + 1 : score;

    if (isCorrect) setScore(newScore);

    const newReview = [
      ...answersReview,
      {
        question: currentQuestion.question,
        selected: selectedOption,
        correct: currentQuestion.answer,
        isCorrect,
      },
    ];

    setAnswersReview(newReview);
    setSelectedOption(null);
    setShowHelp(false);
    setAiHelp("");

    if (currentIndex + 1 < shuffledQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Last question - save and generate analysis
      setSubmitting(true);
      try {
        await quizService.submitQuiz(
          courseId,
          newScore,
          shuffledQuestions.length,
        );
        setShowResults(true);
        // Quiz is now finished - re-enable chatbot
        setIsQuizActive(false);
        await generateFinalAnalysis(newReview, newScore);
      } catch (error) {
        console.error("Failed to submit quiz:", error);
        // Still show results even if save fails
        setShowResults(true);
        // Quiz is now finished - re-enable chatbot
        setIsQuizActive(false);
        await generateFinalAnalysis(newReview, newScore);
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleRestart = () => {
    window.location.reload();
  };

  if (!shuffledQuestions || shuffledQuestions.length === 0) {
    return (
      <section className="quiz-page">
        <div className="quiz-container">
          <p className="not-found">Quiz not available for this course.</p>
          <button className="back-btn" onClick={() => navigate("/courses")}>
            Back to courses
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      className="quiz-page"
      style={{ direction: "ltr", textAlign: "left" }}
    >
      <div className="quiz-container">
        <button
          className="back-btn"
          onClick={() => navigate(location.state?.from || "/courses")}
        >
          ← Back
        </button>

        {!showResults && shuffledQuestions[currentIndex] && (
          <div className="quiz-question-card">
            <div className="quiz-header">
              <div>
                <h2>
                  Question {currentIndex + 1} of {shuffledQuestions.length}
                </h2>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${((currentIndex + 1) / shuffledQuestions.length) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
              <button
                className="help-btn"
                onClick={getAiHelp}
                disabled={loadingHelp}
                title="Get an AI hint for this question"
              >
                {loadingHelp ? "Thinking..." : "💡 AI Hint"}
              </button>
            </div>

            <p className="question">
              {shuffledQuestions[currentIndex].question}
            </p>

            {showHelp && (
              <div className="ai-help-box animate-fade-in">
                <div className="ai-help-header">
                  <span>🤖 AI Tutor Hint:</span>
                  <button
                    className="close-hint"
                    onClick={() => setShowHelp(false)}
                  >
                    ×
                  </button>
                </div>
                <p className="ai-help-text">{aiHelp}</p>
              </div>
            )}

            <ul className="options-list">
              {shuffledQuestions[currentIndex].options.map((option) => (
                <li
                  key={option}
                  className={`option ${selectedOption === option ? "selected" : ""}`}
                  onClick={() => handleOptionSelect(option)}
                >
                  <span className="radio"></span>
                  {option}
                </li>
              ))}
            </ul>

            <button
              className="next-btn"
              onClick={handleNext}
              disabled={!selectedOption || submitting}
            >
              {submitting
                ? "Analyzing..."
                : currentIndex + 1 === shuffledQuestions.length
                  ? "Finish Quiz"
                  : "Next Question"}
            </button>
          </div>
        )}

        {showResults && (
          <div className="quiz-results-card">
            <div className="results-header">
              <h2>Quiz Complete! </h2>
              <div className="score-display">
                <div className="score-circle">
                  <div className="score-percentage">
                    {Math.round((score / shuffledQuestions.length) * 100)}%
                  </div>
                  <div className="score-text">
                    {score} / {shuffledQuestions.length}
                  </div>
                </div>
                <div className="score-message">
                  {score === shuffledQuestions.length
                    ? "Perfect Score! "
                    : score >= shuffledQuestions.length * 0.8
                      ? "Excellent! "
                      : score >= shuffledQuestions.length * 0.6
                        ? "Good Job! "
                        : "Keep Practicing! "}
                </div>
              </div>
            </div>

            <div className="ai-roadmap-section">
              <h3> AI Performance Analysis & Learning Roadmap</h3>
              {loadingAnalysis ? (
                <div className="ai-loading">
                  <div className="spinner"></div>
                  <p>Generating your personalized analysis... ⏳</p>
                </div>
              ) : (
                <div className="roadmap-content">
                  {aiAnalysis.split("\n").map((line, idx) => (
                    <p key={idx} className="analysis-line">
                      {line}
                    </p>
                  ))}
                </div>
              )}
            </div>

            <div className="answer-analysis">
              <h3> Answer Review</h3>
              {answersReview.map((a, idx) => (
                <div
                  key={idx}
                  className={`review-item ${a.isCorrect ? "correct" : "incorrect"}`}
                >
                  <div className="review-status">
                    {a.isCorrect ? "✓ Correct" : "✗ Incorrect"}
                  </div>
                  <div className="review-content">
                    <p className="review-question">
                      <strong>Q:</strong> {a.question}
                    </p>
                    <p className="review-answer">
                      <strong>Your answer:</strong> {a.selected}
                    </p>
                    {!a.isCorrect && (
                      <p className="review-correct">
                        <strong>Correct answer:</strong> {a.correct}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="results-actions">
              <button className="restart-btn" onClick={handleRestart}>
                Retake Quiz
              </button>
              <button
                className="back-courses-btn"
                onClick={() => navigate("/courses")}
              >
                Back to Courses
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
