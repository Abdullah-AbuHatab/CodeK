// src/pages/Auth/admin/QuestionWizard.js
// Two-step wizard for adding multiple questions in one go:
//   Step 1: pick how many questions (1–100)
//   Step 2+: fill each question with progress bar
export default function QuestionWizard({
  questionFormData,
  setQuestionFormData,
  totalQuestions,
  setTotalQuestions,
  currentQuestionStep,
  questionsToAdd,
  wizardErrors,
  onStartWizard,
  onNextQuestion,
  onCancel,
}) {
  const updateOption = (index, value) => {
    const newOptions = [...questionFormData.options];
    newOptions[index] = value;
    setQuestionFormData({ ...questionFormData, options: newOptions });
  };

  // Step 1 — choose number of questions
  if (questionsToAdd.length === 0) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onStartWizard();
        }}
        className="student-form"
      >
        <h3 style={{ marginBottom: "20px", textAlign: "center" }}>
          Add Multiple Questions
        </h3>
        <div className="form-group">
          <label>How many questions do you want to add?</label>
          <input
            type="number"
            min="1"
            max="100"
            value={totalQuestions}
            onChange={(e) => {
              const input = e.target.value;
              if (input === "") {
                setTotalQuestions("");
              } else {
                const num = parseInt(input, 10);
                if (!isNaN(num) && num > 0) {
                  setTotalQuestions(num > 100 ? 100 : num);
                }
              }
            }}
            onBlur={() => {
              if (totalQuestions === "" || totalQuestions < 1) {
                setTotalQuestions(1);
              } else if (totalQuestions > 100) {
                setTotalQuestions(100);
              }
            }}
            placeholder="Enter number of questions"
            required
          />
          {wizardErrors.totalQuestions && (
            <p style={{ color: "red", marginTop: "5px" }}>
              {wizardErrors.totalQuestions}
            </p>
          )}
          <small style={{ display: "block", marginTop: "10px" }}>
            You can add 1 to 100 questions per session
          </small>
        </div>
        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="save-btn">
            Continue
          </button>
        </div>
      </form>
    );
  }

  // Step 2+ — fill in each question
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onNextQuestion();
      }}
      className="student-form"
    >
      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ textAlign: "center" }}>
          Question {currentQuestionStep + 1} of {totalQuestions}
        </h3>
        <div
          style={{
            width: "100%",
            height: "8px",
            backgroundColor: "#e0e0e0",
            borderRadius: "4px",
            overflow: "hidden",
            marginTop: "10px",
          }}
        >
          <div
            style={{
              width: `${((currentQuestionStep + 1) / totalQuestions) * 100}%`,
              height: "100%",
              backgroundColor: "#007bff",
              transition: "width 0.3s ease",
            }}
          />
        </div>
      </div>

      <div className="form-group">
        <label>Question</label>
        <textarea
          value={questionFormData.question}
          onChange={(e) =>
            setQuestionFormData({
              ...questionFormData,
              question: e.target.value,
            })
          }
          rows="3"
        />
        {wizardErrors.question && (
          <p style={{ color: "red", marginTop: "5px" }}>
            {wizardErrors.question}
          </p>
        )}
      </div>

      {questionFormData.options.map((option, index) => (
        <div key={index} className="form-group">
          <label>Option {index + 1}</label>
          <input
            type="text"
            value={option}
            onChange={(e) => updateOption(index, e.target.value)}
          />
        </div>
      ))}
      {wizardErrors.options && (
        <p style={{ color: "red", marginBottom: "15px" }}>
          {wizardErrors.options}
        </p>
      )}

      <div className="form-group">
        <label>Correct Answer</label>
        <select
          value={questionFormData.answer}
          onChange={(e) =>
            setQuestionFormData({
              ...questionFormData,
              answer: e.target.value,
            })
          }
        >
          <option value="">Select correct answer</option>
          {questionFormData.options.map((option, index) => (
            <option key={index} value={option}>
              Option {index + 1}: {option}
            </option>
          ))}
        </select>
        {wizardErrors.answer && (
          <p style={{ color: "red", marginTop: "5px" }}>
            {wizardErrors.answer}
          </p>
        )}
      </div>

      <div className="form-actions">
        <button type="button" className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="save-btn">
          {currentQuestionStep === totalQuestions - 1
            ? "Finish Adding Questions"
            : "Next Question"}
        </button>
      </div>
    </form>
  );
}
