// ============================================
// 📁 src/pages/Auth/Admin.js
// ============================================
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminService, authService } from "../../services/authService";
import { COURSES } from "../../data/coursesData";
import "./Admin.css";

const API_URL = "http://localhost:5000/api";

export default function Admin() {
  const [user, setUser] = useState(null);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [universitySubjects, setUniversitySubjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalStudents: 0, totalQuizzes: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const loadInitialData = async () => {
      // Function to fetch data
      const fetchData = async () => {
        try {
          setLoading(true);
          const [studentsData, statsData, universityRes, coursesRes] = await Promise.all([
            adminService.getAllStudents(),
            adminService.getStats(),
            fetch(`${API_URL}/university-subjects`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }),
            fetch(`${API_URL}/courses`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }),
          ]);

          setStudents(studentsData);
          setStats(statsData);
          if (universityRes.ok) {
            setUniversitySubjects(await universityRes.json());
          }
          if (coursesRes.ok) {
            setCourses(await coursesRes.json());
          }
        } catch (error) {
          console.error("Failed to fetch admin data:", error);
          if (error.message.includes("token")) {
            authService.logout();
            navigate("/login");
          }
        } finally {
          setLoading(false);
        }
      };

      try {
        // Check if user is admin
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser || storedUser.role !== "admin") {
          navigate("/login", { state: { from: "/admin" } });
          return;
        }
        setUser(storedUser);

        // Fetch students and stats
        await fetchData();
      } catch (error) {
        console.error("Failed to fetch admin data:", error);
      }
    };

    loadInitialData();
  }, [navigate]);

  if (loading) {
    return (
      <section className="admin-dashboard">
        <div style={{ textAlign: "center", padding: "50px" }}>
          <p>Loading...</p>
        </div>
      </section>
    );
  }

  if (!user) return null;

  // Calculate course statistics
  const allCourses = [...(courses || []), ...universitySubjects];
  const courseStats = allCourses.map((course) => {
    const allQuizResults = students.flatMap(
      (s) => s.quizResults?.filter((q) => q.courseId === course.id) || [],
    );

    const quizzesCompleted = allQuizResults.length;
    const highestScore = quizzesCompleted
      ? Math.max(...allQuizResults.map((q) => q.score))
      : 0;
    const averageScore = quizzesCompleted
      ? (
          allQuizResults.reduce((sum, q) => sum + q.score, 0) / quizzesCompleted
        ).toFixed(1)
      : 0;

    return {
      id: course.id,
      title: course.title,
      quizzesCompleted,
      highestScore,
      averageScore,
    };
  });

  // Filter students by search
  const filteredStudents = students.filter(
    (student) =>
      student?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student?.username?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Get course title helper
  const getCourseTitle = (courseId) => {
    const course = courses.find((c) => c.id === courseId);
    if (course) return course.title;
    const uniSubject = universitySubjects.find((s) => s.id === courseId);
    return uniSubject ? uniSubject.title : courseId;
  };

  // Logout handler
  const handleLogout = () => {
    authService.logout();
    window.dispatchEvent(new Event("storage"));
    navigate("/login");
  };

  return (
    <section className="admin-dashboard">
      {/* Header */}
      <div className="admin-header">
        <div>
          <h1>Welcome, {user.name || "Admin"} </h1>
          <p className="subtitle">Admin Dashboard</p>
        </div>
        <div className="admin-actions">
          <button
            className="manage-btn"
            onClick={() => navigate("/admin/manage")}
          >
            Manage System
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-cards">
        <div className="card">
          <h3>Total Courses</h3>
          <p>{allCourses.length}</p>
        </div>
        <div className="card">
          <h3>Total Students</h3>
          <p>{stats.totalStudents}</p>
        </div>
        <div className="card">
          <h3>Quizzes Completed</h3>
          <p>{stats.totalQuizzes}</p>
        </div>
      </div>

      {/* Courses Table */}
      <div className="section">
        <h2>Courses Overview</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Course</th>
                <th>Quizzes Completed</th>
                <th>Highest Score</th>
                <th>Average Score</th>
              </tr>
            </thead>
            <tbody>
              {courseStats.map((c) => (
                <tr key={c.id}>
                  <td>{c.title}</td>
                  <td>{c.quizzesCompleted}</td>
                  <td>{c.highestScore}</td>
                  <td>{c.averageScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Students Table */}
      <div className="section">
        <div className="section-header">
          <h2>Students Overview</h2>
          <input
            type="text"
            placeholder="Search student by name..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Enrolled Courses</th>
                <th>Results</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((s) => {
                  const explicitCourses = s.courses || [];
                  const activeQuizCourses =
                    s.quizResults?.map((q) => q.courseId) || [];
                  const allActiveCoursesIds = [
                    ...new Set([...explicitCourses, ...activeQuizCourses]),
                  ];

                  return (
                    <tr key={s.username}>
                      <td>{s.fullName || s.name || "-"}</td>
                      <td>{s.email || "-"}</td>
                      <td>{s.phone || "-"}</td>
                      <td>
                        {allActiveCoursesIds.length > 0
                          ? allActiveCoursesIds
                              .map((id) => getCourseTitle(id))
                              .join(", ")
                          : "-"}
                      </td>
                      <td>
                        {s.quizResults?.length > 0
                          ? s.quizResults
                              .map((q) => `${q.score}/${q.total}`)
                              .join(" | ")
                          : "-"}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    style={{
                      textAlign: "center",
                      padding: "20px",
                      color: "#94a3b8",
                    }}
                  >
                    No student found matching "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
