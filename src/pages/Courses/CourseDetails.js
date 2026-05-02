// ============================================
// 📁 src/pages/Courses/CourseDetails.js
// ============================================
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { COURSES } from "../../data/coursesData";
import { UNIVERSITY_SUBJECTS } from "../../data/universitySubjectsData";
import "./CourseDetails.css";

export default function CourseDetails() {
  const { courseId, subjectId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch course from database
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost:5000/api/courses/public/all",
        );
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const courses = await response.json();

        // Find course by ID from database
        let foundCourse = courses.find(
          (c) => c.id === courseId || c._id === courseId,
        );

        // Fallback to mock data if not found in database
        if (!foundCourse) {
          foundCourse = COURSES.find((c) => c.id === courseId);
        }

        setCourse(foundCourse || null);
      } catch (err) {
        console.warn("Error fetching course from DB, using mock data:", err);
        setCourse(COURSES.find((c) => c.id === courseId) || null);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  if (courseId === "university") {
    return (
      <section className="course-details-page">
        <div className="course-details-container" data-aos="fade-up">
          <button
            type="button"
            className="back-btn"
            onClick={() => navigate("/courses")}
          >
            ← Back to courses
          </button>

          <header className="course-details-header">
            <h1>مواد الجامعة</h1>
            <p>اختر المادة لعرض تفاصيلها</p>
          </header>

          <div className="courses-grid">
            {UNIVERSITY_SUBJECTS.map((subject) => (
              <article key={subject.id} className="course-card subject-card">
                <h2>{subject.title}</h2>
                <p className="course-card__badge">{subject.badge}</p>
                <p>{subject.semester}</p>

                <button
                  type="button"
                  className="course-card__btn"
                  onClick={() => navigate(`/courses/university/${subject.id}`)}
                >
                  Open Subject
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // University subjects with subjectId
  if (course?.isUniversity) {
    if (subjectId) {
      const subject = UNIVERSITY_SUBJECTS.find((s) => s.id === subjectId);
      if (!subject) {
        return (
          <section className="course-details-page">
            <div className="course-details-container">
              <p className="not-found">Subject not found.</p>
              <button
                type="button"
                className="back-btn"
                onClick={() => navigate("/courses/university")}
              >
                ← Back to University Courses
              </button>
            </div>
          </section>
        );
      }

      return (
        <section className="course-details-page">
          <div className="course-details-container">
            <button
              type="button"
              className="back-btn"
              onClick={() => navigate("/courses/university")}
            >
              ← Back to University Courses
            </button>
            <header className="course-details-header">
              <h1>{subject.title}</h1>
              <p>{subject.shortDescription}</p>
              <p>
                <strong>{subject.semester}</strong>
              </p>
            </header>
          </div>
        </section>
      );
    }

    // Show all university subjects
    return (
      <section className="course-details-page">
        <div className="course-details-container">
          <button
            type="button"
            className="back-btn"
            onClick={() => navigate("/courses")}
          >
            ← Back to courses
          </button>
          <header className="course-details-header">
            <h1>مواد الجامعة</h1>
            <p>اختر المادة لعرض تفاصيلها</p>
          </header>
          <div className="courses-grid">
            {UNIVERSITY_SUBJECTS.map((subject) => (
              <article key={subject.id} className="course-card">
                <h2>{subject.title}</h2>
                <p className="course-card__badge">{subject.badge}</p>
                <p>{subject.shortDescription}</p>
                <p>
                  <strong>{subject.semester}</strong>
                </p>
                <button
                  type="button"
                  className="course-card__btn"
                  onClick={() => navigate(`/courses/university/${subject.id}`)}
                >
                  View Details
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Loading state
  if (loading) {
    return (
      <section className="course-details-page">
        <div className="course-details-container">
          <p className="not-found">Loading course...</p>
        </div>
      </section>
    );
  }

  // Course not found
  if (!course) {
    return (
      <section className="course-details-page">
        <div className="course-details-container">
          <p className="not-found">Course not found. (ID: {courseId})</p>
          <button
            type="button"
            className="back-btn"
            onClick={() => navigate("/courses")}
          >
            ← Back to courses
          </button>
        </div>
      </section>
    );
  }

  // Regular course details
  return (
    <section className="course-details-page">
      <div className="course-details-container">
        <button
          type="button"
          className="back-btn"
          onClick={() => navigate("/courses")}
        >
          ← Back to courses
        </button>

        <header className="course-details-header">
          <span className="course-pill category">{course.category}</span>
          <span
            className={`course-pill level level-${course.level.toLowerCase()}`}
          >
            {course.level}
          </span>
          <h1>{course.title}</h1>
          <p className="badge">{course.badge}</p>
          <p className="duration">⏱ Duration: {course.duration}</p>
        </header>

        <div className="course-details-layout">
          <main className="course-main">
            <section>
              <h2>Overview</h2>
              <p>{course.longDescription}</p>
            </section>

            <section className="assessment-info">
              <h2>How It Works / Skill Assessment</h2>
              <p>{course.assessmentInstructions}</p>
              <ul>
                <li>Number of Questions: {course.assessment.numQuestions}</li>
                <li>Estimated Time: {course.assessment.estimatedTime}</li>
                <li>Analysis: {course.assessment.analysis ? "Yes" : "No"}</li>
                <li>
                  AI Recommendations:{" "}
                  {course.assessment.aiRecommendations ? "Yes" : "No"}
                </li>
              </ul>
            </section>

            <section>
              <h2>What you will learn</h2>
              <ul>
                {course.objectives?.map((obj) => (
                  <li key={obj}>{obj}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2>Topics covered</h2>
              <ul>
                {course.topics.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </section>
          </main>

          <aside className="course-side">
            <div className="course-side-card">
              <h3>Course summary</h3>
              <ul>
                <li>
                  <strong>Level:</strong> {course.level}
                </li>
                <li>
                  <strong>Category:</strong> {course.category}
                </li>
                <li>
                  <strong>Duration:</strong> {course.duration}
                </li>
              </ul>
              <p className="requirements">
                <strong>Requirements:</strong> {course.prerequisitesShort}
              </p>

              <button
                type="button"
                className="enroll-btn"
                onClick={() => navigate(`/courses/${course.id}/quiz`)}
              >
                Start Skill Assessment
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
