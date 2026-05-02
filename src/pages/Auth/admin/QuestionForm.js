// src/pages/Auth/admin/QuestionForm.js
// Single-question add/edit form (non-wizard mode).
export default function QuestionForm({
  questionFormData,
  setQuestionFormData,
  editingQuestion,
  onSubmit,
  onCancel,
}) {
  const updateOption = (index, value) => {
    const newOptions = [...questionFormData.options];
    newOptions[index] = value;
    setQuestionFormData({ ...questionFormData, options: newOptions });
  };

  return (
    <form onSubmit={onSubmit} className="student-form">
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
          required
          rows="3"
        />
      </div>
      {questionFormData.options.map((option, index) => (
        <div key={index} className="form-group">
          <label>Option {index + 1}</label>
          <input
            type="text"
            value={option}
            onChange={(e) => updateOption(index, e.target.value)}
            required
          />
        </div>
      ))}
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
          required
        >
          <option value="">Select correct answer</option>
          {questionFormData.options.map((option, index) => (
            <option key={index} value={option}>
              Option {index + 1}: {option}
            </option>
          ))}
        </select>
      </div>

      <div className="form-actions">
        <button type="button" className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="save-btn">
          {editingQuestion ? "Update" : "Add"} Question
        </button>
      </div>
    </form>
  );
}
