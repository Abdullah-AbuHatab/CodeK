// src/pages/Auth/admin/ComplaintDetailsModal.js
// Inline detail view shown inside the existing AdminManage modal shell.
// Renders the original message, any prior replies, and a textarea + submit
// button so the admin can respond. The parent owns the network calls.

import { useState } from "react";

const formatDate = (iso) => {
  if (!iso) return "-";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "-" : d.toLocaleString();
};

export default function ComplaintDetailsModal({
  complaint,
  onSendReply,
  onCancel,
  sending,
}) {
  const [replyText, setReplyText] = useState("");
  const [error, setError] = useState("");

  if (!complaint) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const trimmed = replyText.trim();
    if (trimmed.length < 5) {
      setError("Reply must be at least 5 characters.");
      return;
    }
    if (trimmed.length > 2000) {
      setError("Reply must be at most 2000 characters.");
      return;
    }
    const ok = await onSendReply(trimmed);
    if (ok) {
      setReplyText("");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <p style={{ marginBottom: "6px" }}>
          <strong>From:</strong> {complaint.name} &lt;{complaint.email}&gt;
        </p>
        {complaint.subject && (
          <p style={{ marginBottom: "6px" }}>
            <strong>Subject:</strong> {complaint.subject}
          </p>
        )}
        <p style={{ marginBottom: "6px", color: "#6b7280", fontSize: "13px" }}>
          <strong>Received:</strong> {formatDate(complaint.createdAt)}
        </p>
        <div
          style={{
            marginTop: "12px",
            padding: "14px",
            backgroundColor: "#f9fafb",
            color: "#111827",
            borderRadius: "8px",
            borderLeft: "3px solid #4f46e5",
            whiteSpace: "pre-wrap",
            lineHeight: 1.6,
          }}
        >
          {complaint.message}
        </div>
      </div>

      {complaint.replies && complaint.replies.length > 0 && (
        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ fontSize: "16px", marginBottom: "12px" }}>
            Reply history
          </h3>
          {complaint.replies.map((r) => (
            <div
              key={r._id}
              style={{
                marginBottom: "12px",
                padding: "12px",
                backgroundColor: "#eef2ff",
                color: "#111827",
                borderRadius: "8px",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  color: "#4b5563",
                  marginBottom: "6px",
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "8px",
                }}
              >
                <span>Sent {formatDate(r.sentAt)}</span>
                <span>
                  via {r.deliveredVia}
                  {r.error ? " — delivery failed" : ""}
                </span>
              </div>
              <div
                style={{
                  whiteSpace: "pre-wrap",
                  lineHeight: 1.5,
                  color: "#111827",
                }}
              >
                {r.message}
              </div>
              {r.error && (
                <div
                  style={{
                    marginTop: "8px",
                    fontSize: "12px",
                    color: "#991b1b",
                  }}
                >
                  Error: {r.error}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <h3 style={{ fontSize: "16px", marginBottom: "8px" }}>
          {complaint.replies && complaint.replies.length > 0
            ? "Send another reply"
            : "Reply"}
        </h3>
        <textarea
          rows={5}
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          placeholder="Type your reply to the user..."
          disabled={sending}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#ffffff",
            color: "#111827",
            border: "1px solid #d1d5db",
            borderRadius: "8px",
            fontFamily: "inherit",
            fontSize: "14px",
            resize: "vertical",
          }}
        />
        {error && (
          <p style={{ color: "#991b1b", fontSize: "13px", marginTop: "8px" }}>
            {error}
          </p>
        )}
        <div
          style={{
            marginTop: "16px",
            display: "flex",
            gap: "10px",
            justifyContent: "flex-end",
          }}
        >
          <button
            type="button"
            className="cancel-btn"
            onClick={onCancel}
            disabled={sending}
          >
            Close
          </button>
          <button type="submit" className="add-btn" disabled={sending}>
            {sending ? "Sending..." : "Send Reply"}
          </button>
        </div>
      </form>
    </div>
  );
}
