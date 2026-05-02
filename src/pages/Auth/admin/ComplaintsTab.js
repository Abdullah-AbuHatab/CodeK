// src/pages/Auth/admin/ComplaintsTab.js
// Lists user-submitted complaints. Each row exposes "View / Reply" which the
// parent uses to open the details modal, plus a quick "Delete" action.

const STATUS_LABELS = {
  new: "New",
  read: "Read",
  replied: "Replied",
};

const STATUS_COLORS = {
  new: { bg: "#fee2e2", color: "#991b1b" },
  read: { bg: "#fef3c7", color: "#92400e" },
  replied: { bg: "#d1fae5", color: "#065f46" },
};

const formatDate = (iso) => {
  if (!iso) return "-";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "-" : d.toLocaleString();
};

const truncate = (str = "", n = 60) =>
  str.length > n ? `${str.slice(0, n)}...` : str;

export default function ComplaintsTab({
  complaints,
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  onView,
  onDelete,
}) {
  return (
    <div>
      <div className="section-header">
        <div className="header-left">
          <h2>Complaints & Messages</h2>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          marginBottom: "16px",
        }}
      >
        <input
          type="text"
          placeholder="Search by name, email, or subject..."
          className="search-input"
          style={{ flex: "1 1 240px" }}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
          className="search-input"
          style={{ flex: "0 0 160px", cursor: "pointer" }}
        >
          <option value="all">All</option>
          <option value="new">New</option>
          <option value="read">Read</option>
          <option value="replied">Replied</option>
        </select>
      </div>

      {complaints.length > 0 ? (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Status</th>
                <th>Name</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Received</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((c) => {
                const palette = STATUS_COLORS[c.status] || STATUS_COLORS.new;
                return (
                  <tr key={c._id}>
                    <td>
                      <span
                        style={{
                          backgroundColor: palette.bg,
                          color: palette.color,
                          padding: "4px 10px",
                          borderRadius: "999px",
                          fontSize: "12px",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        {STATUS_LABELS[c.status] || c.status}
                      </span>
                    </td>
                    <td className="student-name">{c.name}</td>
                    <td>{c.email}</td>
                    <td>{truncate(c.subject || "-", 40)}</td>
                    <td title={c.message}>{truncate(c.message, 60)}</td>
                    <td>{formatDate(c.createdAt)}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="edit-btn"
                          onClick={() => onView(c)}
                        >
                          View / Reply
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => onDelete(c._id, c.name)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-state">
          <p>No complaints match the current filter.</p>
        </div>
      )}
    </div>
  );
}
