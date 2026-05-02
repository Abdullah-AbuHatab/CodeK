// ============================================
// 📁 src/pages/Auth/Student.js
// ============================================
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Student.css";

export default function Student() {
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser || storedUser.role !== "student") {
      navigate("/login", { state: { from: "/student" } });
      return;
    }

    setUser(storedUser);

    // Read quiz history for student
    const storedHistory = JSON.parse(localStorage.getItem("quizHistory")) || [];
    const studentHistory = storedHistory.filter(
      (q) => q.studentUsername === storedUser.username,
    );
    setHistory(studentHistory);
  }, [navigate]);

  if (!user) return null;

  return (
    <section className="student-dashboard">
      <h1>Welcome, {user.name}!</h1>
      <p className="subtitle">Here's your dashboard overview.</p>

      {/* Enrolled Courses */}
      <div className="section">
        <h2>Your Courses</h2>
        <div className="courses-grid">
          {user.courses && user.courses.length > 0 ? (
            user.courses.map((course, idx) => (
              <div key={idx} className="course-card">
                {course.charAt(0).toUpperCase() + course.slice(1)}
              </div>
            ))
          ) : (
            <p>You are not enrolled in any courses yet.</p>
          )}
        </div>
      </div>

      {/* Quiz History */}
      <div className="section">
        <h2>Quiz History</h2>
        {history.length > 0 ? (
          <div className="quiz-history">
            {history.map((h, idx) => (
              <div key={idx} className="quiz-item">
                <span className="quiz-course">
                  {h.courseId.charAt(0).toUpperCase() + h.courseId.slice(1)}
                </span>
                <span className="quiz-score">
                  Score: {h.score}/{h.total} ({h.date})
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p>No quiz attempts yet.</p>
        )}
      </div>

      {/* Logout Button */}
      <button
        className="logout-btn"
        onClick={() => {
          localStorage.removeItem("user");
          navigate("/login");
          window.dispatchEvent(new Event("storage"));
        }}
      >
        Logout
      </button>
    </section>
  );
}
