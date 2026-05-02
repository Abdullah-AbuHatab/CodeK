// src/config.js
// Single source of truth for runtime configuration on the frontend.
// Override via REACT_APP_* env variables (.env at repo root).
//
// Default is the relative path "/api" so that a monolith deployment
// (Express serving the build directory) just works without configuration.
// For local development set REACT_APP_API_URL=http://localhost:5000/api in
// .env.local — the React dev server on :3000 cannot reach :5000 via "/api".

export const API_URL = process.env.REACT_APP_API_URL || "/api";
