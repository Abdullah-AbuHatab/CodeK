// ============================================
// 📁 src/pages/Courses/Courses.js
// ============================================
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Courses.css";
import { COURSES } from "../../data/coursesData";

export default function Courses() {
  const [levelFilter, setLevelFilter] = useState("All");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost:5000/api/courses/public/all",
      );
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }
      const data = await response.json();
      // If database is empty, use mock data as fallback
      setCourses(data && data.length > 0 ? data : COURSES);
      setError(null);
    } catch (err) {
      console.warn("Error fetching courses from DB, using mock data:", err);
      setCourses(COURSES);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  const levels = ["All", "Beginner", "Intermediate", "Advanced"];

  const filteredCourses =
    levelFilter === "All"
      ? courses
      : courses.filter((course) => course.level === levelFilter);

  return (
    <section className="courses-page">
      <div className="courses-container">
        {/* Header */}
        <header className="courses-header" data-aos="fade-up">
          <h1>Choose a Path & Assess Your Skills</h1>
          <p>
            This platform was built by Computer Science students to give you a
            clear and friendly path into{" "}
            <span className="hl">Web Development</span>,{" "}
            <span className="hl">AI</span>, and{" "}
            <span className="hl">Cyber Security</span>.
          </p>
          <p className="courses-note">
            Select the appropriate level from above (Beginner / Intermediate /
            Advanced), then view the course details to review the topics and
            prerequisites before starting.
          </p>
        </header>

        {/* Filters */}
        <div
          className="courses-filters"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {levels.map((level) => (
            <button
              key={level}
              type="button"
              className={
                levelFilter === level
                  ? "filter-btn filter-btn--active"
                  : "filter-btn"
              }
              onClick={() => setLevelFilter(level)}
            >
              {level}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && <p className="courses-count">Loading courses...</p>}

        {/* Count */}
        {!loading && (
          <p className="courses-count" data-aos="fade-up" data-aos-delay="150">
            Showing <strong>{filteredCourses.length}</strong> course
            {filteredCourses.length !== 1 && "s"} (
            {levelFilter === "All" ? "All levels" : levelFilter})
          </p>
        )}

        {/* Cards */}
        <div className="courses-grid">
          {filteredCourses.map((course, index) => (
            <article
              key={course.id || course._id}
              className="course-card"
              data-aos="fade-up"
              data-aos-delay={index * 120}
            >
              <div className="course-card__head">
                <span className="course-card__category">{course.category}</span>
                <span
                  className={`course-card__level level-${course.level.toLowerCase()}`}
                >
                  {course.level}
                </span>
              </div>

              <h2 className="course-card__title">{course.title}</h2>
              <p className="course-card__badge">{course.badge}</p>
              <p className="course-card__desc">{course.shortDescription}</p>

              {course.topics && (
                <ul className="course-card__topics">
                  {course.topics.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              )}

              <div className="course-card__footer">
                <span className="course-card__duration">
                  ⏱ {course.duration}
                </span>
                <button
                  type="button"
                  className="course-card__btn"
                  onClick={() =>
                    navigate(`/courses/${course.id || course._id}`)
                  }
                >
                  Start Assessment
                </button>
              </div>
            </article>
          ))}
        </div>
        <section
          className="courses-footer-note"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <h2>How we designed these paths</h2>
          <p>
            Each course was structured by our team to be short, focused and
            practical. We started from what we wished we had when we first
            learned programming, then turned it into clear paths with real
            examples and small tasks After completing the quiz, the system
            analyzes your answers and suggests what to study next based on your
            performance.
          </p>
        </section>
      </div>
    </section>
  );
}
