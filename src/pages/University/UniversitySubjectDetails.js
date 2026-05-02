import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { UNIVERSITY_SUBJECTS } from "../../data/universitySubjectsData";
import "./UniversitySubjectDetails.css";

export default function UniversitySubjectDetails() {
  const { subjectId } = useParams();
  const navigate = useNavigate();

  const subject = UNIVERSITY_SUBJECTS.find((s) => s.id === subjectId);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  if (!subject) {
    return (
      <section className="course-details-page">
        <div className="course-details-container">
          <p className="not-found">Subject not found.</p>
          <button onClick={() => navigate("/courses/university")}>Back</button>
        </div>
      </section>
    );
  }

  return (
    <section className="course-details-page">
      <div className="course-details-container" data-aos="fade-up">
        <button
          type="button"
          className="back-btn"
          onClick={() => navigate("/courses/university")}
        >
          ← Back to subjects
        </button>

        <header className="course-details-header">
          <span className="course-pill category">University</span>
          <span className="course-pill level">{subject.semester}</span>
          <h1>{subject.title}</h1>
          <p className="badge">{subject.badge}</p>
        </header>

        <div className="course-details-layout">
          {/* LEFT */}
          <main className="course-main">
            <section>
              <h2>Overview</h2>
              <p>{subject.longDescription}</p>
            </section>

            <section>
              <h2>Chapters</h2>
              <ul className="chapters-list">
                {subject.chapters.map((chapter, index) => {
                  // Some seed data stores chapters as plain strings, others
                  // as { id, title, file } objects. Normalize before render.
                  const isObject =
                    chapter && typeof chapter === "object";
                  const id = isObject ? chapter.id : undefined;
                  const title = isObject ? chapter.title : chapter;
                  const file = isObject ? chapter.file : null;

                  return (
                    <li key={id || `chapter-${index}`} className="chapter-item">
                      <span>{title}</span>

                      {file && (
                        <div className="chapter-actions">
                          <button
                            type="button"
                            className="view-btn"
                            onClick={() => window.open(file, "_blank")}
                          >
                            👁 View
                          </button>

                          <a href={file} download className="download-btn">
                            ⬇ Download
                          </a>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>

            <section>
              <h2>What you will learn</h2>
              <ul>
                {subject.objectives.map((o, index) => (
                  <li key={`${o}-${index}`}>{o}</li>
                ))}
              </ul>
            </section>
          </main>

          {/* RIGHT */}
          <aside className="course-side">
            <div className="course-side-card">
              <h3>Subject Quiz</h3>
              <ul>
                <li>
                  <strong>Questions:</strong> {subject.quiz.numQuestions}
                </li>
                <li>
                  <strong>Time:</strong> {subject.quiz.estimatedTime}
                </li>
              </ul>

              <p className="requirements">
                <strong>Requirements:</strong> {subject.prerequisites}
              </p>

              <button
                type="button"
                className="enroll-btn"
                onClick={() =>
                  navigate(`/courses/university/${subject.id}/quiz`)
                }
              >
                Start Quiz
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
