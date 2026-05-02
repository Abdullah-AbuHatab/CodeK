  import emailjs from "emailjs-com";
  import { useState } from "react";
  import "./Contact.css";

  export default function Contact() {
    const [sending, setSending] = useState(false);

    const sendEmail = (e) => {
      e.preventDefault();
      setSending(true);

      emailjs
        .sendForm(
          "service_iokapgr",     // replace with your Service ID
          "template_3b42gju",    // replace with your Template ID
          e.target,
          "O8vVEP2ll52ORjlfG"    // replace with your Public Key / User ID
        )
        .then(
          (result) => {
            console.log("EmailJS success:", result.text);
            alert("Your message has been sent successfully ✅");
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
      <section id="contact" className="band-contact">
        <div className="contact-wrap">
          <h2>Contact Us</h2>
          <p className="contact-desc">
            Have any questions or suggestions? Feel free to send us a message and we will get back to you shortly.
          </p>

          <form className="contact-form" onSubmit={sendEmail}>
            <div className="field">
              <label>Name</label>
              <input
                name="name"
                type="text"
                required
                placeholder="Your full name"
              />
            </div>

            <div className="field">
              <label>Email</label>
              <input
                name="email"
                type="email"
                required
                placeholder="you@example.com"
              />
            </div>

            <div className="field">
              <label>Message</label>
              <textarea
                name="message"
                rows="5"
                required
                placeholder="Write your message here..."
              />
            </div>

            <button type="submit" disabled={sending} className="contact-btn">
              {sending ? "Sending..." : "Send Message"}
            </button>
          </form>

      
        </div>
      </section>
    );
  }
