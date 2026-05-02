// src/pages/Auth/admin/SubjectsTab.js
// University subjects tab inside the admin manage page.
export default function SubjectsTab({
  subjects,
  searchTerm,
  onSearchChange,
  onAdd,
  onEdit,
  onDelete,
}) {
  return (
    <div>
      <div className="section-header">
        <div className="header-left">
          <h2>University Subjects Management</h2>
        </div>
        <button className="add-btn" onClick={onAdd}>
          Add Subject
        </button>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search university subjects..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
      </div>

      {subjects.length > 0 ? (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Semester</th>
                <th>Badge</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject) => (
                <tr key={subject._id}>
                  <td>{subject.id}</td>
                  <td>{subject.title}</td>
                  <td>{subject.semester}</td>
                  <td>{subject.badge}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="edit-btn" onClick={() => onEdit(subject)}>
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => onDelete(subject._id, subject.title)}
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
          <p>No university subjects found</p>
        </div>
      )}
    </div>
  );
}
