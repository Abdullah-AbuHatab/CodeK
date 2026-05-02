import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { quizService } from "../../services/authService";
import "./Quiz.css";

export default function Quiz() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [answersReview, setAnswersReview] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

  useEffect(() => {
    const fetchQuiz = async () => {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user || user.role !== "student") {
        navigate("/login", { state: { from: location.pathname } });
        return;
      }

      try {
        const data = await quizService.getQuiz(courseId); // جلب الـ quiz من backend
        if (data.questions && data.questions.length > 0) {
          const questions = shuffleArray(data.questions).map((q) => ({
            ...q,
            options: shuffleArray(q.options),
          }));
          setShuffledQuestions(questions);
        } else {
          setShuffledQuestions([]);
        }
      } catch (error) {
        console.error("Failed to load quiz:", error);
        setShuffledQuestions([]);
      }
    };

    fetchQuiz();
  }, [courseId, navigate, location.pathname]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNext = async () => {
    if (!selectedOption) return;

    const currentQuestion = shuffledQuestions[currentIndex];
    const isCorrect = selectedOption === currentQuestion.answer;
    const newScore = isCorrect ? score + 1 : score;

    if (isCorrect) setScore(newScore);

    setAnswersReview((prev) => [
      ...prev,
      {
        question: currentQuestion.question,
        selected: selectedOption,
        correct: currentQuestion.answer,
        isCorrect,
      },
    ]);

    setSelectedOption(null);

    if (currentIndex + 1 < shuffledQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Last question - submit to backend
      setSubmitting(true);
      try {
        await quizService.submitQuiz(
          courseId,
          newScore,
          shuffledQuestions.length,
        );
        setShowResults(true);
      } catch (error) {
        console.error("Failed to submit quiz:", error);
        alert("Failed to save quiz result. Please try again.");
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelectedOption(null);
    setShowResults(false);
    setAnswersReview([]);
    const questions = shuffleArray(shuffledQuestions).map((q) => ({
      ...q,
      options: shuffleArray(q.options),
    }));
    setShuffledQuestions(questions);
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
    <section className="quiz-page">
      <div className="quiz-container">
        <button
          className="back-btn"
          onClick={() => navigate(location.state?.from || "/courses")}
        >
          ← Back
        </button>

        {!showResults && shuffledQuestions[currentIndex] && (
          <div className="quiz-question-card">
            <h2>
              Question {currentIndex + 1} of {shuffledQuestions.length}
            </h2>
            <p className="question">
              {shuffledQuestions[currentIndex].question}
            </p>

            <ul className="options-list">
              {shuffledQuestions[currentIndex].options.map((option) => (
                <li
                  key={option}
                  className={`option ${
                    selectedOption === option ? "selected" : ""
                  }`}
                  onClick={() => handleOptionSelect(option)}
                >
                  {option}
                </li>
              ))}
            </ul>

            <button
              className="next-btn"
              onClick={handleNext}
              disabled={submitting}
            >
              {submitting
                ? "Submitting..."
                : currentIndex + 1 === shuffledQuestions.length
                  ? "Finish"
                  : "Next"}
            </button>
          </div>
        )}

        {showResults && (
          <div className="quiz-results-card">
            <h2>
              Your Score: {score} / {shuffledQuestions.length}
            </h2>

            <div className="answer-analysis">
              {answersReview.map((a, idx) => (
                <div
                  key={idx}
                  className={`answer-item ${
                    a.isCorrect ? "correct" : "incorrect"
                  }`}
                >
                  <p>
                    {a.isCorrect ? "✓ Correct" : "✗ Incorrect"} - {a.question}
                  </p>
                  {!a.isCorrect && (
                    <>
                      <p className="user-answer">Your answer: {a.selected}</p>
                      <p className="correct-answer">
                        Correct answer: {a.correct}
                      </p>
                    </>
                  )}
                </div>
              ))}
            </div>

            <div className="ai-review">
              <h3>AI Review</h3>
              <p>
                Focus on topics where you answered incorrectly to improve your
                understanding.
              </p>
            </div>

            <button className="restart-btn" onClick={handleRestart}>
              Restart Quiz
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
