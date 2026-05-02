// src/components/common/Notification.js
// Toast-style notification used by the admin pages. Pass a notification
// object ({ type: "success" | "error", message: string }) or null. The
// component auto-dismisses after `durationMs` and calls onDismiss so the
// parent can clear its state.
import { useEffect } from "react";

export default function Notification({
  notification,
  onDismiss,
  durationMs = 3000,
}) {
  useEffect(() => {
    if (!notification) return undefined;
    const t = setTimeout(onDismiss, durationMs);
    return () => clearTimeout(t);
  }, [notification, onDismiss, durationMs]);

  if (!notification) return null;

  const isError = notification.type === "error";

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        padding: "15px 20px",
        borderRadius: "6px",
        backgroundColor: isError ? "#f44336" : "#4caf50",
        color: "white",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        zIndex: 1000,
        maxWidth: "400px",
        animation: "slideIn 0.3s ease-out",
      }}
    >
      {notification.message}
    </div>
  );
}
