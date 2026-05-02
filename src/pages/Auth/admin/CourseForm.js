// src/pages/Auth/admin/CourseForm.js
// Add/Edit Course modal body. Shape and behavior match the previous
// inline form in AdminManage; everything is controlled from the parent.
export default function CourseForm({
  courseFormData,
  setCourseFormData,
  editingCourse,
  onSubmit,
  onCancel,
}) {
  const update = (patch) => setCourseFormData({ ...courseFormData, ...patch });

  return (
    <form onSubmit={onSubmit} className="student-form">
      <div className="form-row">
        <div className="form-group">
          <label>ID</label>
          <input
            type="text"
            value={courseFormData.id}
            onChange={(e) => update({ id: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={courseFormData.title}
            onChange={(e) => update({ title: e.target.value })}
            required
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            value={courseFormData.category}
            onChange={(e) => update({ category: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Level</label>
          <select
            value={courseFormData.level}
            onChange={(e) => update({ level: e.target.value })}
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Duration</label>
          <input
            type="text"
            value={courseFormData.duration}
            onChange={(e) => update({ duration: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Badge</label>
          <input
            type="text"
            value={courseFormData.badge}
            onChange={(e) => update({ badge: e.target.value })}
          />
        </div>
      </div>
      <div className="form-group">
        <label>Short Description</label>
        <textarea
          value={courseFormData.shortDescription}
          onChange={(e) => update({ shortDescription: e.target.value })}
          rows="3"
        />
      </div>
      <div className="form-group">
        <label>Long Description</label>
        <textarea
          value={courseFormData.longDescription}
          onChange={(e) => update({ longDescription: e.target.value })}
          rows="5"
        />
      </div>
      <div className="form-group">
        <label>Prerequisites</label>
        <textarea
          value={courseFormData.prerequisitesShort}
          onChange={(e) => update({ prerequisitesShort: e.target.value })}
          rows="3"
        />
      </div>
      <div className="form-group">
        <label>Topics</label>
        <textarea
          value={courseFormData.topics}
          onChange={(e) => update({ topics: e.target.value })}
          rows="3"
        />
      </div>
      <div className="form-group">
        <label>Objectives</label>
        <textarea
          value={courseFormData.objectives}
          onChange={(e) => update({ objectives: e.target.value })}
          rows="3"
        />
      </div>
      <div className="form-group">
        <label>Assessment Instructions</label>
        <textarea
          value={courseFormData.assessmentInstructions}
          onChange={(e) => update({ assessmentInstructions: e.target.value })}
          rows="3"
        />
      </div>
      <div className="form-actions">
        <button type="button" className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="save-btn">
          {editingCourse ? "Update" : "Add"} Course
        </button>
      </div>
    </form>
  );
}
