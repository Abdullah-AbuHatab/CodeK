// src/pages/Auth/admin/StudentForm.js
// The Add/Edit Student modal body. Shape matches what AdminManage was
// rendering inline; behavior is identical.
export default function StudentForm({
  formData,
  setFormData,
  editingStudent,
  onSubmit,
  onCancel,
}) {
  return (
    <form onSubmit={onSubmit} className="student-form">
      <div className="form-group">
        <label>Full Name</label>
        <input
          type="text"
          value={formData.fullName}
          onChange={(e) =>
            setFormData({ ...formData, fullName: e.target.value })
          }
          required
        />
      </div>
      <div className="form-group">
        <label>Username</label>
        <input
          type="text"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          required
          disabled={!!editingStudent}
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          required
        />
      </div>
      <div className="form-group">
        <label>Phone</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) =>
            setFormData({ ...formData, phone: e.target.value })
          }
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required={!editingStudent}
        />
      </div>
      <div className="form-actions">
        <button type="button" className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="save-btn">
          {editingStudent ? "Update" : "Add"} Student
        </button>
      </div>
    </form>
  );
}
