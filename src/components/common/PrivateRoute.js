// src/components/common/PrivateRoute.js
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { API_URL } from "../../config";
const VERIFY_CACHE_KEY = "auth:lastVerified";
const VERIFY_TTL_MS = 60 * 1000; // 1 min — keeps navigation snappy

const readUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

const wasRecentlyVerified = () => {
  const ts = Number(sessionStorage.getItem(VERIFY_CACHE_KEY));
  return ts && Date.now() - ts < VERIFY_TTL_MS;
};

const markVerified = () => {
  sessionStorage.setItem(VERIFY_CACHE_KEY, String(Date.now()));
};

const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  sessionStorage.removeItem(VERIFY_CACHE_KEY);
};

export default function PrivateRoute({ children, roles }) {
  const location = useLocation();
  const [status, setStatus] = useState(() => {
    const user = readUser();
    if (!user) return "unauthenticated";
    if (wasRecentlyVerified()) return "verified";
    return "checking";
  });

  useEffect(() => {
    if (status !== "checking") return;

    let cancelled = false;
    const token = localStorage.getItem("token");
    if (!token) {
      setStatus("unauthenticated");
      return;
    }

    (async () => {
      try {
        const res = await fetch(`${API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (cancelled) return;

        if (res.status === 401 || res.status === 403) {
          clearAuth();
          setStatus("unauthenticated");
          return;
        }

        if (!res.ok) {
          // Server reachable but errored (5xx). Be permissive so a flaky
          // backend doesn't lock the user out, but don't refresh the cache.
          setStatus("verified");
          return;
        }

        const fresh = await res.json();
        localStorage.setItem("user", JSON.stringify(fresh));
        markVerified();
        setStatus("verified");
      } catch (err) {
        // Network failure (server down, offline). Be permissive.
        if (!cancelled) setStatus("verified");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [status]);

  if (status === "unauthenticated") {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (status === "checking") {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#94a3b8",
        }}
      >
        <p>Checking your session…</p>
      </div>
    );
  }

  // status === "verified"
  const user = readUser();
  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
