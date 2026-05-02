// src/pages/Auth/admin/QuizQuestionsManager.js
// Sub-view shown when a course is selected from CoursesTab. Lists the
// course's quiz questions and surfaces add / edit / delete actions.
export default function QuizQuestionsManager({
  questions,
  onBack,
  onAdd,
  onEdit,
  onDelete,
}) {
  return (
    <div>
      <div className="section-header">
        <div className="header-left">
          <h2>Quiz Management</h2>
          <button className="back-btn" onClick={onBack}>
            ← Back to Courses
          </button>
        </div>
        <button className="add-btn" onClick={onAdd}>
          Add Question
        </button>
      </div>
      <div className="questions-list">
        {questions.map((question) => (
          <div key={question._id} className="question-card">
            <div className="question-header">
              <h3>{question.question}</h3>
              <div className="action-buttons">
                <button className="edit-btn" onClick={() => onEdit(question)}>
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => onDelete(question._id)}
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="question-body">
              <ul>
                {question.options.map((option, index) => (
                  <li
                    key={index}
                    style={{
                      fontWeight:
                        option === question.answer ? "bold" : "normal",
                      color:
                        option === question.answer ? "#10b981" : "inherit",
                    }}
                  >
                    {option}
                  </li>
                ))}
              </ul>
              {question.hint && (
                <p>
                  <strong>Hint:</strong> {question.hint}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
