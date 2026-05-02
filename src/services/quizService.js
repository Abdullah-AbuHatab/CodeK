// src/services/quizService.js
import { authService } from "./authService";

const API_URL = "http://localhost:5000/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `API error: ${response.status}`);
  }
  return response.json();
};

export const quizService = {
  // جلب quiz حسب courseId
  async getQuiz(courseId) {
    try {
      const response = await fetch(`${API_URL}/quizzes/${courseId}`);
      return handleResponse(response); // { courseId, questions: [...] }
    } catch (error) {
      console.error("Failed to fetch quiz:", error);
      throw error;
    }
  },

  // حفظ نتيجة quiz
  async submitQuiz(courseId, score, total) {
    try {
      const response = await fetch(`${API_URL}/quiz/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify({ courseId, score, total }),
      });

      const data = await handleResponse(response);

      // تحديث بيانات المستخدم المحلية
      const user = authService.getStoredUser();
      if (user) {
        user.quizResults = data.quizResults;
        localStorage.setItem("user", JSON.stringify(user));
      }

      return data;
    } catch (error) {
      console.error("Failed to submit quiz:", error);
      throw error;
    }
  },
  async getHint(question) {
    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify({
          prompt: `Provide a hint for this question without giving the answer: "${question}"`,
        }),
      });
      const data = await handleResponse(response);
      return data.reply;
    } catch (error) {
      console.error("Failed to get AI hint:", error);
      throw error;
    }
  },

  // 🔹 جديد: Analyze Quiz Results
  async analyzeResults(answersReview) {
    try {
      const reviewText = answersReview
        .map(
          (a) =>
            `Question: ${a.question}\nUser Answer: ${a.selected}\nCorrect Answer: ${a.correct}\nIs Correct: ${a.isCorrect ? "Yes" : "No"}`,
        )
        .join("\n\n");

      const prompt = `Analyze these quiz results. Identify strengths and weaknesses, and suggest a personalized learning plan:\n\n${reviewText}`;

      const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await handleResponse(response);
      return data.reply;
    } catch (error) {
      console.error("Failed to analyze results:", error);
      throw error;
    }
  },
};
