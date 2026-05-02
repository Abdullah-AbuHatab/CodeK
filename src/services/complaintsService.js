// src/services/complaintsService.js
import { API_URL } from "../config";

const authHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

const handle = async (response) => {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const err = new Error(data.message || `Request failed (${response.status})`);
    err.status = response.status;
    err.data = data;
    throw err;
  }
  return data;
};

export const complaintsService = {
  // Public: visitor submits the contact form.
  async submit({ name, email, subject, message }) {
    const response = await fetch(`${API_URL}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, subject, message }),
    });
    return handle(response);
  },

  // Admin: list all complaints.
  async list() {
    const response = await fetch(`${API_URL}/admin/complaints`, {
      headers: authHeaders(),
    });
    return handle(response);
  },

  // Admin: mark complaint as read.
  async markAsRead(id) {
    const response = await fetch(`${API_URL}/admin/complaints/${id}/read`, {
      method: "PATCH",
      headers: authHeaders(),
    });
    return handle(response);
  },

  // Admin: send a reply.
  async reply(id, message) {
    const response = await fetch(`${API_URL}/admin/complaints/${id}/reply`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ message }),
    });
    return handle(response);
  },

  // Admin: delete a complaint.
  async remove(id) {
    const response = await fetch(`${API_URL}/admin/complaints/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
    return handle(response);
  },
};
