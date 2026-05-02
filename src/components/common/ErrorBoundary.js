// src/components/common/ErrorBoundary.js
// Class component because React only supports error boundaries via class.
// Catches render errors anywhere in the tree below it and shows a fallback
// instead of an empty white screen.
import { Component } from "react";

const isDev = process.env.NODE_ENV !== "production";

const styles = {
  wrap: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "32px 16px",
    background: "linear-gradient(180deg, #0f172a 0%, #16243a 100%)",
    color: "#e2e8f0",
    fontFamily: "Poppins, Cairo, sans-serif",
  },
  card: {
    maxWidth: "560px",
    width: "100%",
    background: "#1e293b",
    borderRadius: "12px",
    padding: "32px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
    textAlign: "center",
  },
  title: { margin: "0 0 8px", fontSize: "24px", color: "#ffffff" },
  subtitle: { margin: "0 0 24px", color: "#94a3b8" },
  actions: {
    display: "flex",
    gap: "12px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  primaryBtn: {
    background: "#38bdf8",
    color: "#0f172a",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    fontWeight: 600,
    cursor: "pointer",
  },
  ghostBtn: {
    background: "transparent",
    color: "#e2e8f0",
    border: "1px solid #475569",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
  },
  details: {
    marginTop: "24px",
    textAlign: "left",
    background: "#0f172a",
    padding: "12px",
    borderRadius: "8px",
    fontSize: "12px",
    color: "#fca5a5",
    overflow: "auto",
    maxHeight: "240px",
  },
};

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // In a real product this is where you'd ship to Sentry / Datadog / etc.
    if (isDev) {
      console.error("ErrorBoundary caught:", error, info);
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = "/";
  };

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    return (
      <div style={styles.wrap} role="alert">
        <div style={styles.card}>
          <h1 style={styles.title}>Something went wrong</h1>
          <p style={styles.subtitle}>
            We hit an unexpected error. You can try reloading the page or
            heading back to the home page.
          </p>
          <div style={styles.actions}>
            <button style={styles.primaryBtn} onClick={this.handleReload}>
              Reload page
            </button>
            <button style={styles.ghostBtn} onClick={this.handleGoHome}>
              Go home
            </button>
          </div>
          {isDev && (
            <pre style={styles.details}>
              {error?.stack || String(error)}
            </pre>
          )}
        </div>
      </div>
    );
  }
}
