// src/config.js
// Single source of truth for runtime configuration on the frontend.
// Override via REACT_APP_* env variables (.env at repo root).

export const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";
