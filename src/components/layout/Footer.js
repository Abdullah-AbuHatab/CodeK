import { NavLink } from "react-router-dom";
import "./footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__grid">
        {/* Brand */}
        <div className="footer__brand">
          <h3>CodeK</h3>
          <p>Learn. Explore. Build your future with us.</p>
        </div>

        {/* Quick Links */}
        <nav className="footer__links" aria-label="Footer navigation">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <NavLink to="/" end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/courses">Courses</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
          </ul>
        </nav>

        {/* Newsletter & Social */}
        <div className="footer__news">
          <h4>Stay Connected</h4>
          <p>Subscribe for updates and new courses.</p>
          <form onSubmit={(e) => e.preventDefault()} className="footer__form">
            <input
              type="email"
              placeholder="Enter your email"
              aria-label="Email for newsletter"
              required
            />
            <button type="submit">Subscribe</button>
          </form>

          <div className="footer__social" aria-label="Social media links">
            <a
              href="https://x.com/mahmoudmhasnh?s=21"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on X (Twitter)"
            >
              X/Twitter
            </a>
            <a
              href="https://www.linkedin.com/in/mahmoud-al-mahasnh-033712274"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Connect on LinkedIn"
            >
              LinkedIn
            </a>
            <a
              href="https://www.instagram.com/7o_tc"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Instagram"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bar">
        <small>© {year} CodeK Platform – All rights reserved.</small>
        <button
          className="back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll back to top"
        >
          ↑ Back to top
        </button>
      </div>
    </footer>
  );
}
