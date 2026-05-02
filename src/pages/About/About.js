// src/pages/About/About.js
import "aos/dist/aos.css";
import "./About.css";

import mahmoudImg from "../../components/assets/images/Mahmoud.jpg";
import khaledImg from "../../components/assets/images/Khaled.jpg";
import AbdullahImg from "../../components/assets/images/Abdullah.jpg";
import OmarImg from "../../components/assets/images/Omar.jpg";
import MarkImg from "../../components/assets/images/Mark.jpg";
import MohammedImg from "../../components/assets/images/Mohammed.jpg";

const TEAM_MEMBERS = [
  {
    name: "Mohammed Ibdah",
    role: "Team Leader & Frontend Architect",
    img: MohammedImg,
    bio: (
      <>
        Built the core <b>App Structure</b> and managed global <b>Routing</b> to
        ensure the platform functions as a seamless and integrated single-page
        application.
      </>
    ),
  },
  {
    name: "Mahmoud Al-Mahasneh",
    role: "UI/UX Designer & Creative Dev",
    img: mahmoudImg,
    bio: "Responsible for enhancing the UI/UX, implementing interactive Animations, and designing the landing sections to create a visually engaging user experience.",
  },
  {
    name: "Mark Haddad",
    role: "System Logic & Backend Dev",
    img: MarkImg,
    bio: (
      <>
        Developed the interactive <b>Quiz System</b>, engineering the core logic
        for questions, score calculation, and structuring the underlying quiz
        data architecture.
      </>
    ),
  },
  {
    name: "Abdullah Abu-hatab",
    role: "Data Structure & Content Lead",
    img: AbdullahImg,
    bio: "In charge of Course Data Management and structuring, as well as developing the educational content layouts and detailed course views.",
  },
  {
    name: "Omar Ashraf",
    role: "React State & Hooks Specialist",
    img: OmarImg,
    bio: (
      <>
        Manages the application's global <b>State Management</b> using React
        Hooks, ensuring efficient and conflict-free <b>Data Flow</b> across
        various components.
      </>
    ),
  },
  {
    name: "Khaled Dhdoli",
    role: "Input Security & Validation",
    img: khaledImg,
    bio: "Developer of the Support & Contact modules, responsible for building Forms and implementing Input Validation to ensure secure and accurate message delivery.",
  },
];

export default function About() {
  return (
    <section className="about-page">
      <div className="about-container">
        {/* Hero */}
        <header className="about-hero" data-aos="fade-up">
          <h1>About CodeK Platform</h1>
          <p>
            CodeK Platform is a simple, focused learning space that helps you
            build your path in <span className="hl">programming</span> step by
            step – from <span className="hl">absolute beginner</span> to{" "}
            <span className="hl">job-ready level</span>.
          </p>
        </header>

        {/* Stats */}
        <section
          className="about-stats"
          aria-label="Platform stats"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="stat-card">
            <span className="stat-number">+10 </span>
            <span className="stat-label">Learning paths</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">+50 </span>
            <span className="stat-label">Hours of practical content</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">100% </span>
            <span className="stat-label">Focus on hands-on work</span>
          </div>
        </section>

        {/* Why we built it */}
        <section className="about-block" data-aos="fade-up">
          <h2>Why did we build this platform?</h2>
          <p>
            The idea behind CodeK Platform is to give students a clear and
            friendly place to start programming without feeling lost. You
            don&apos;t need perfect English or a strong background. We guide you
            from the basics all the way to building real projects, with small,
            clear steps.
          </p>
          <p>
            Each topic follows a simple pattern:{" "}
            <strong>short explanation → practical example → small task</strong>,
            so you actually understand and remember instead of just memorizing
            theory.
          </p>
        </section>

        {/* Values / what makes it different */}
        <section className="about-values" data-aos="fade-up">
          <h2>What makes CodeK Platform different?</h2>
          <div className="values-grid">
            <article className="value-card">
              <h3>Simple language</h3>
              <p>
                Concepts are explained in clear, friendly language with the
                important technical terms kept in English so you can still use
                global resources and documentation.
              </p>
            </article>

            <article className="value-card">
              <h3>Project-based learning</h3>
              <p>
                Instead of just watching videos, every path includes{" "}
                <strong>small projects</strong> that help you connect the dots
                and build a portfolio over time.
              </p>
            </article>

            <article className="value-card">
              <h3>Clear roadmaps</h3>
              <p>
                Each path is split into clear stages:{" "}
                <strong>Fundamentals → Practice → Project</strong>. No random,
                messy list of topics.
              </p>
            </article>

            <article className="value-card">
              <h3>Focused on web, AI & security</h3>
              <p>
                We focus on three main worlds:{" "}
                <span className="hl">Web Development</span>,{" "}
                <span className="hl">Artificial Intelligence</span>, and{" "}
                <span className="hl">Cyber Security</span> – some of the most
                in-demand fields right now.
              </p>
            </article>
          </div>
        </section>

        {/* How to start */}
        <section className="about-start" data-aos="fade-up">
          <h2>How do I start?</h2>
          <ol>
            <li>
              Start with Web Development 101 if you are a complete beginner.
            </li>
            <li>Move to Modern JavaScript and then React Fundamentals.</li>
            <li>
              If you want to explore more, try <strong>AI Basics</strong> or{" "}
              <strong>Cyber Security Fundamentals</strong>.
            </li>
          </ol>
          <p className="about-note">
            The goal is not to finish the maximum number of courses. The goal is
            to <strong>build real things</strong>, even if they are small.
          </p>
        </section>

        {/* Team section */}
        <section className="about-team" data-aos="fade-up">
          <h2>Meet the Team</h2>
          <p className="about-team-intro">
            This project was developed by six Computer Science students, aiming
            to build a platform that helps learners enter the worlds of
            Programming, Web Development, AI, and Cybersecurity in a simple and
            practical way.
          </p>
          <div className="team-grid">
            {TEAM_MEMBERS.map((member) => (
              <article key={member.name} className="team-card">
                <div className="team-avatar">
                  <img src={member.img} alt={member.name} />
                </div>
                <h3>{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <p className="team-bio">{member.bio}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
