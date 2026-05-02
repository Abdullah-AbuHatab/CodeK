// ============================================
// 📁 src/pages/Home/Home.js
// ============================================
import "./home.css";
import { NavLink, useNavigate } from "react-router-dom";
import WhyChoose from "./WhyChoose";
import Contact from "./Contacts";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      {/* GET STARTED */}
      <section className="full band-hero">
        <div className="get-started">
          <h1>Welcome To CodeK Platform</h1>
          <p>Learn. Explore. Build your future with us.</p>
          <button onClick={() => navigate("/courses")}>Get Started</button>
          <div className="quick-bullets fade-up">
            <span>15–30 min per lesson</span>
            <span> Certificate on completion</span>
            <span> Beginner → Advanced</span>
          </div>

          <div data-aos="fade-up" className="cta-row fade-up delay">
            <button
              onClick={() =>
                document
                  .getElementById("courses")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View Courses
            </button>
            <button
              className="btn-ghost"
              onClick={() =>
                document
                  .getElementById("why")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Why Choose Us?
            </button>

            <button
              className="btn-ghost"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* COURSES */}
      <section id="courses" className="full band-courses">
        <div>
          <div className="courses-intro">
            <h2>Start Learning Now </h2>
            <p>
              Not sure where to start? Begin your journey with{" "}
              <span className="hl">Web Development</span>, explore your
              curiosity in <span className="hl">AI Basics</span>, and protect
              your digital world with <span className="hl">Cyber Security</span>
              .
            </p>
          </div>

          <div className="box">
            {["Web Development", "AI Basics", "Cyber Security"].map(
              (title, i) => (
                <div
                  key={title}
                  data-aos={
                    window.innerWidth > 768
                      ? "fade-up"
                      : i % 2 === 0
                        ? "fade-right"
                        : "fade-left"
                  }
                  data-aos-delay={i * 150}
                >
                  <h3>{title}</h3>
                  <p>Start learning {title.toLowerCase()} !</p>

                  <ul className="card-details">
                    {(title === "Web Development"
                      ? [
                          "HTML/CSS basics",
                          "JS fundamentals",
                          "Build a landing page",
                        ]
                      : title === "AI Basics"
                        ? [
                            "Intro to ML",
                            "Train a tiny model",
                            "Hands-on notebooks",
                          ]
                        : ["OWASP Top 10", "Basic networking", "Safe practices"]
                    ).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>

                  <NavLink to="/courses">
                    <button>View Course</button>
                  </NavLink>
                </div>
              ),
            )}
          </div>

          <div className="courses-hint">
            <p>
              Not sure where to start? Begin with{" "}
              <span className="hl">Web Development</span> if it's your first
              time, then try <span className="hl">AI Basics</span>.
            </p>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <WhyChoose />

      {/* CONTACT */}
      <Contact />
    </>
  );
}
