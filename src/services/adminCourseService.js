// services/adminCourseService.js
const API_URL = "http://localhost:5000/api";

export const adminCourseService = {
  // Get all courses
  getAllCourses: async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/courses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }

      return await response.json();
    } catch (error) {
      console.error("Get courses error:", error);
      throw error;
    }
  },

  // Get all university subjects
  getAllUniversitySubjects: async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/university`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch university subjects");
      }

      return await response.json();
    } catch (error) {
      console.error("Get university subjects error:", error);
      throw error;
    }
  },

  // Create new course
  createCourse: async (courseData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/courses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(courseData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create course");
      }

      return await response.json();
    } catch (error) {
      console.error("Create course error:", error);
      throw error;
    }
  },

  // Update course
  updateCourse: async (courseId, courseData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/courses/${courseId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(courseData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update course");
      }

      return await response.json();
    } catch (error) {
      console.error("Update course error:", error);
      throw error;
    }
  },

  // Delete course
  deleteCourse: async (courseId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/courses/${courseId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete course");
      }

      return await response.json();
    } catch (error) {
      console.error("Delete course error:", error);
      throw error;
    }
  },

  // Create new university subject
  createUniversitySubject: async (subjectData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/university`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(subjectData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create subject");
      }

      return await response.json();
    } catch (error) {
      console.error("Create subject error:", error);
      throw error;
    }
  },

  // Update university subject
  updateUniversitySubject: async (subjectId, subjectData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/university/${subjectId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(subjectData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update subject");
      }

      return await response.json();
    } catch (error) {
      console.error("Update subject error:", error);
      throw error;
    }
  },

  // Delete university subject
  deleteUniversitySubject: async (subjectId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/university/${subjectId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete subject");
      }

      return await response.json();
    } catch (error) {
      console.error("Delete subject error:", error);
      throw error;
    }
  },
};
