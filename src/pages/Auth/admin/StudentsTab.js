// src/pages/Auth/admin/StudentsTab.js
// Renders the "Students" tab inside the admin management page: header with
// add button, search input, and the students table. Pure presentational —
// all state and handlers are passed in.
export default function StudentsTab({
  students,
  searchTerm,
  onSearchChange,
  courseMap,
  onAdd,
  onEdit,
  onDelete,
}) {
  return (
    <div>
      <div className="section-header">
        <div className="header-left">
          <h2>Students Management</h2>
        </div>
        <button className="add-btn" onClick={onAdd}>
          Add Student
        </button>
      </div>
      <input
        type="text"
        placeholder="Search students..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      {students.length > 0 ? (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Subjects</th>
                <th>Results</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td className="student-name">{student.fullName}</td>
                  <td>{student.username}</td>
                  <td>{student.email}</td>
                  <td>{student.phone}</td>
                  <td>
                    {student.courses && student.courses.length > 0
                      ? student.courses
                          .map((id) => courseMap[id] || id)
                          .join(", ")
                      : "-"}
                  </td>
                  <td>
                    {student.quizResults && student.quizResults.length > 0
                      ? student.quizResults
                          .map((q) => `${q.score}/${q.total}`)
                          .join(" | ")
                      : "-"}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="edit-btn"
                        onClick={() => onEdit(student)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => onDelete(student._id, student.fullName)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-state">
          <p>No students found</p>
        </div>
      )}
    </div>
  );
}
