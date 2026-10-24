// src/services/chatService.js
// Single client for the AI tutor endpoint (POST /api/chat).
//
// Contract: send { message, history } — the server owns the system prompt and
// builds the role-separated messages for the model. Errors come back as
// { code, message } with stable codes (AI_TIMEOUT, AI_RATE_LIMITED,
// AUTH_REQUIRED, ...); upstream provider details are never exposed.
import { API_URL } from "../config";

// The server waits up to ~20 s for the model; give the request a little more
// before the browser gives up on it.
const CLIENT_TIMEOUT_MS = 30000;

// How many recent turns the floating assistant sends as context.
export const CHAT_HISTORY_LIMIT = 6;

export class ChatError extends Error {
  constructor(code, message, status) {
    super(message || "The AI tutor is unavailable right now.");
    this.name = "ChatError";
    this.code = code;
    this.status = status;
  }
}

// Turn UI messages into the `history` the API accepts: user/assistant turns
// only, newest last, without local-only entries (greeting, error notices).
export function toChatHistory(messages, limit = CHAT_HISTORY_LIMIT) {
  return (messages || [])
    .filter(
      (m) =>
        m &&
        !m.local &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim() !== "",
    )
    .slice(-limit)
    .map(({ role, content }) => ({ role, content }));
}

// Resolves with the tutor's reply text; rejects with a ChatError.
export async function askTutor({ message, history = [] }) {
  const token = localStorage.getItem("token");
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), CLIENT_TIMEOUT_MS);

  try {
    const response = await fetch(`${API_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({ message, history }),
      signal: controller.signal,
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new ChatError(data.code || "CHAT_FAILED", data.message, response.status);
    }

    const reply = data.reply || data.response;
    if (typeof reply !== "string" || reply.trim() === "") {
      throw new ChatError("AI_EMPTY_RESPONSE", "The AI tutor returned an empty answer.");
    }
    return reply.trim();
  } catch (error) {
    if (error instanceof ChatError) throw error;
    if (error && error.name === "AbortError") {
      throw new ChatError("CLIENT_TIMEOUT", "The AI tutor took too long to answer.");
    }
    throw new ChatError("NETWORK_ERROR", "Could not reach the server.");
  } finally {
    clearTimeout(timer);
  }
}
