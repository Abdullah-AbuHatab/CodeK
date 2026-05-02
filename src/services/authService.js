// src/services/authService.js
const API_URL = "http://localhost:5000/api";

// Helper function للحصول على الـ token
const getAuthToken = () => {
  return localStorage.getItem("token");
};

// Helper function للحصول على headers
const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Auth Service
export const authService = {
  // Sign Up
  async signup(userData) {
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      // Save token and user
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      return data;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  },

  // Login
  async login(username, password) {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Save token and user
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      return data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  // Logout
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  // Get Current User
  async getCurrentUser() {
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }

      const user = await response.json();
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error) {
      console.error("Get user error:", error);
      this.logout();
      throw error;
    }
  },

  // Check if user is authenticated
  isAuthenticated() {
    return !!getAuthToken();
  },

  // Get stored user
  getStoredUser() {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },
};

// Quiz Service
export const quizService = {
  // Submit Quiz Result
  async submitQuiz(courseId, score, total) {
    try {
      const response = await fetch(`${API_URL}/quiz/submit`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ courseId, score, total }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit quiz");
      }

      // Update local user data
      const user = authService.getStoredUser();
      if (user) {
        user.quizResults = data.quizResults;
        localStorage.setItem("user", JSON.stringify(user));
      }

      return data;
    } catch (error) {
      console.error("Submit quiz error:", error);
      throw error;
    }
  },
};

// Admin Service
export const adminService = {
  // Get All Students
  async getAllStudents() {
    try {
      const response = await fetch(`${API_URL}/admin/students`, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }

      return await response.json();
    } catch (error) {
      console.error("Get students error:", error);
      throw error;
    }
  },

  // Get Statistics
  async getStats() {
    try {
      const response = await fetch(`${API_URL}/admin/stats`, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch stats");
      }

      return await response.json();
    } catch (error) {
      console.error("Get stats error:", error);
      throw error;
    }
  },
};
