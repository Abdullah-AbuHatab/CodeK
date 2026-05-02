// ============================================
// 📁 src/pages/Home/WhyChoose.js
// ============================================
import "aos/dist/aos.css";
import "./WhyChoose.css";

export default function WhyChoose() {
  return (
    <section id="why" className="band-why">
      <div className="why-alt">
        <h2 data-aos="fade-up">Why Choose CodeK?</h2>

        <div className="alt-rows">
          {/* Row 1 */}
          <article className="row">
            <div
              className="cell text"
              data-aos="fade-right"
              data-aos-delay="100"
              data-aos-anchor-placement="top-bottom"
            >
              <h3>Clear Roadmaps</h3>
              <p>From zero to advanced with step-by-step tracks.</p>
              <ul>
                <li>HTML → CSS → JS → React</li>
                <li>Node.js, Express, MongoDB</li>
              </ul>
            </div>

            <div
              className="cell card"
              data-aos="fade-left"
              data-aos-delay="200"
              data-aos-anchor-placement="top-bottom"
            >
              <h4>Quality Content</h4>
              <p>Lessons curated, concise, and frequently updated.</p>
            </div>
          </article>

          {/* Row 2 */}
          <article className="row">
            <div
              className="cell card"
              data-aos="fade-right"
              data-aos-delay="100"
            >
              <h4> Expert Tutors</h4>
              <p>Learn from people who ship real projects.</p>
            </div>

            <div
              className="cell text"
              data-aos="fade-left"
              data-aos-delay="200"
            >
              <h3>Real-World Practice</h3>
              <p>Mini tasks and projects with instant feedback.</p>
              <ul>
                <li>Code snippets & reviews</li>
                <li>Interview-style challenges</li>
              </ul>
            </div>
          </article>

          {/* Row 3 */}
          <article className="row">
            <div
              className="cell text"
              data-aos="fade-right"
              data-aos-delay="100"
            >
              <h3>Anytime, Anywhere</h3>
              <p>Responsive lessons that work on all devices.</p>
              <ul>
                <li>Mobile friendly</li>
                <li>Works on low bandwidth</li>
              </ul>
            </div>

            <div
              className="cell card"
              data-aos="fade-left"
              data-aos-delay="200"
            >
              <h4> Community</h4>
              <p>Ask, share, and grow together.</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
