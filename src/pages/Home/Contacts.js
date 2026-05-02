  import { useCallback, useState } from "react";
  import { complaintsService } from "../../services/complaintsService";
  import Notification from "../../components/common/Notification";
  import "./Contact.css";

  export default function Contact() {
    const [sending, setSending] = useState(false);
    const [notification, setNotification] = useState(null);
    const dismissNotification = useCallback(() => setNotification(null), []);

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (sending) return;
      setSending(true);

      const form = e.target;
      const payload = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        message: form.message.value.trim(),
      };

      try {
        await complaintsService.submit(payload);
        setNotification({
          type: "success",
          message: "Your message has been sent successfully.",
        });
        form.reset();
      } catch (error) {
        console.error("Contact submit error:", error);
        setNotification({
          type: "error",
          message:
            error.message || "Could not send your message. Please try again.",
        });
      } finally {
        setSending(false);
      }
    };

    return (
      <section id="contact" className="band-contact">
        <Notification
          notification={notification}
          onDismiss={dismissNotification}
          durationMs={4000}
        />
        <div className="contact-wrap">
          <h2>Contact Us</h2>
          <p className="contact-desc">
            Have any questions or suggestions? Feel free to send us a message and we will get back to you shortly.
          </p>

          <form className="contact-form" onSubmit={handleSubmit}>
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
                minLength={10}
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
