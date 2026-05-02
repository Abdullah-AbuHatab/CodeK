// src/components/pages/ContactPage.js
import "aos/dist/aos.css";
import { useState } from "react";
import emailjs from "emailjs-com";
import "./ContactPage.css";

export default function ContactPage() {
  const [messagesReceived] = useState(1245);
  const [sending, setSending] = useState(false);

  const faqs = [
    {
      question: "How do I enroll in a course?",
      answer:
        "You can enroll by clicking the 'Get Started' button on the Home page or by visiting the Courses page directly.",
    },
    {
      question: "Do I have lifetime access to the content?",
      answer:
        "Absolutely! Once you purchase a course, it remains in your account forever, and you can revisit it anytime.",
    },
    {
      question: "I forgot my password, what should I do?",
      answer:
        "Don't worry. You can easily reset your password by clicking the 'Forgot Password' link on the login page.",
    },
    {
      question: "Can I access the courses on my mobile device?",
      answer:
        "Yes, our platform is fully responsive and mobile-friendly, working seamlessly on all smartphones and tablets.",
    },
    {
      question: "How do I contact technical support?",
      answer:
        "If you face any issues, you can use the 'Contact Us' form or email our support team directly.",
    },
    {
      question: "Which browsers are supported?",
      answer:
        "The platform is optimized to work smoothly on all modern browsers, including Chrome, Firefox, Safari, and Edge.",
    },
  ];

  const sendEmail = (e) => {
    e.preventDefault();
    setSending(true);

    emailjs
      .sendForm(
        "service_iokapgr",    // Service ID
        "template_3b42gju",   // Template ID
        e.target,
        "O8vVEP2ll52ORjlfG"   // Public Key / User ID
      )
      .then(
        (result) => {
          console.log("EmailJS success:", result.text);
          alert("Your message has been sent successfully ✅ Thank you for contacting us!");
          e.target.reset();
          setSending(false);
        },
        (error) => {
          console.error("EmailJS error:", error);
          alert("Oops! Something went wrong ❌ Check console for details.");
          setSending(false);
        }
      );
  };

  return (
    <section className="contact-page">
      <div className="contact-page__inner" data-aos="fade-up">
        {/* ===== Header ===== */}
        <header className="contact-page__header">
          <h1>Contact the CodeK Team</h1>
          <p>
            Whether you have a question about courses, suggestions to improve
            the platform, or want to reach out regarding the project, drop us a
            message and we'll get back to you as soon as possible 
          </p>
          <div className="contact-page__badge">
             {messagesReceived.toLocaleString()} messages answered
          </div>
        </header>

        {/* ===== Main Layout ===== */}
        <div className="contact-page__layout">
          {/* ===== Info Section ===== */}
          <aside className="contact-page__info">
            <h2>Quick contacts</h2>
            <p>
              You can email us directly or use the contact form on the right.
            </p>

            <ul>
              <li>
                 <strong>Email:</strong>{" "}
                <a href="mailto:gradgenius.team@gmail.com">
                  mokabratxd@gmail.com
                </a>
              </li>
              <li>
                 <strong>University:</strong> AL - Huson Colege
              </li>
              <li>
                 <strong>Project:</strong> CodeK Learning Platform
              </li> 
            </ul>
          </aside>

          {/* ===== Form Section ===== */}
          <form className="contact-page__form" onSubmit={sendEmail}>
            <div className="field">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Enter your full name"
              />
            </div>

            <div className="field">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
              />
            </div>

            <div className="field">
              <label htmlFor="topic">Subject</label>
              <input
                id="topic"
                name="topic"
                type="text"
                placeholder="e.g., Question about React Course"
              />
            </div>

            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                required
                placeholder="Write the details of your question or suggestion here..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="contact-page__btn"
              disabled={sending}
            >
              {sending ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* ===== FAQ Section ===== */}
        <div className="contact-page__faq">
          <h2>Common Questions</h2>
          {faqs.map((faq, i) => (
            <details key={i}>
              <summary className="faq-question">{faq.question}</summary>
              <p className="faq-answer">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
