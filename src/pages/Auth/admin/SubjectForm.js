// src/pages/Auth/admin/SubjectForm.js
// Add/Edit University Subject modal body.
export default function SubjectForm({
  formData,
  setFormData,
  editingSubject,
  onSubmit,
  onCancel,
}) {
  const update = (patch) => setFormData({ ...formData, ...patch });
  const updateQuiz = (patch) =>
    setFormData({ ...formData, quiz: { ...formData.quiz, ...patch } });

  return (
    <form onSubmit={onSubmit} className="student-form">
      <div className="form-row">
        <div className="form-group">
          <label>ID</label>
          <input
            type="text"
            value={formData.id}
            onChange={(e) => update({ id: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => update({ title: e.target.value })}
            required
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Semester</label>
          <input
            type="text"
            value={formData.semester}
            onChange={(e) => update({ semester: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Badge</label>
          <input
            type="text"
            value={formData.badge}
            onChange={(e) => update({ badge: e.target.value })}
          />
        </div>
      </div>
      <div className="form-group">
        <label>Long Description</label>
        <textarea
          value={formData.longDescription}
          onChange={(e) => update({ longDescription: e.target.value })}
          rows="4"
        />
      </div>
      <div className="form-group">
        <label>Prerequisites</label>
        <input
          type="text"
          value={formData.prerequisites}
          onChange={(e) => update({ prerequisites: e.target.value })}
        />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Quiz Questions</label>
          <input
            type="number"
            value={formData.quiz.numQuestions}
            onChange={(e) =>
              updateQuiz({ numQuestions: parseInt(e.target.value) || 15 })
            }
          />
        </div>
        <div className="form-group">
          <label>Estimated Time</label>
          <input
            type="text"
            value={formData.quiz.estimatedTime}
            onChange={(e) => updateQuiz({ estimatedTime: e.target.value })}
          />
        </div>
      </div>
      <div className="form-actions">
        <button type="button" className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="save-btn">
          {editingSubject ? "Update" : "Add"} Subject
        </button>
      </div>
    </form>
  );
}
