// src/pages/Auth/admin/CoursesTab.js
// Courses tab inside the admin manage page: header + search + table.
export default function CoursesTab({
  courses,
  searchTerm,
  onSearchChange,
  onAdd,
  onEdit,
  onManageQuiz,
  onDelete,
}) {
  return (
    <div>
      <div className="section-header">
        <div className="header-left">
          <h2>Courses Management</h2>
        </div>
        <button className="add-btn" onClick={onAdd}>
          Add Course
        </button>
      </div>
      <input
        type="text"
        placeholder="Search courses..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      {courses.length > 0 ? (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Level</th>
                <th>Duration</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course._id}>
                  <td>{course.title}</td>
                  <td>{course.category}</td>
                  <td>
                    <span
                      className={`level-badge level-${course.level.toLowerCase()}`}
                    >
                      {course.level}
                    </span>
                  </td>
                  <td>{course.duration}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="edit-btn" onClick={() => onEdit(course)}>
                        Edit
                      </button>
                      <button
                        className="quiz-btn"
                        onClick={() => onManageQuiz(course.id)}
                      >
                        Quiz
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => onDelete(course._id, course.title)}
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
          <p>No courses found</p>
        </div>
      )}
    </div>
  );
}
