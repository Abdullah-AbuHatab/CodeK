// Thin wrapper around Brevo's transactional email REST API.
// We deliberately don't pull in the official SDK — a single fetch keeps the
// dependency surface small and makes the contract explicit.
//
// Failure policy: never throw on send errors. Callers (the contact endpoint,
// the admin reply endpoint) treat email delivery as best-effort and persist
// the complaint/reply regardless. The result object reports what happened so
// callers can record it on the complaint document.

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

const escapeHtml = (str = "") =>
  String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

// Minimal HTML escape + line-break preservation so user-typed messages
// render correctly in the destination inbox without becoming an XSS vector.
const formatBody = (text) =>
  escapeHtml(text).replace(/\r?\n/g, "<br>");

async function sendEmail({ to, subject, htmlContent, replyTo }) {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME || "CodeK";

  if (!apiKey || !senderEmail) {
    console.warn(
      "⚠️  Brevo not configured (BREVO_API_KEY / BREVO_SENDER_EMAIL missing) — skipping email send",
    );
    return {
      ok: false,
      skipped: true,
      error: "Brevo credentials not configured on the server",
    };
  }

  const payload = {
    sender: { name: senderName, email: senderEmail },
    to: [{ email: to }],
    subject,
    htmlContent,
  };
  if (replyTo) payload.replyTo = { email: replyTo };

  try {
    const response = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errMsg =
        data?.message || `Brevo API returned status ${response.status}`;
      console.error("❌ Brevo send failed:", errMsg, data);
      return { ok: false, skipped: false, error: errMsg };
    }

    return { ok: true, skipped: false, messageId: data.messageId };
  } catch (err) {
    console.error("❌ Brevo network error:", err.message);
    return { ok: false, skipped: false, error: err.message };
  }
}

// Notification sent to the configured admin inbox the moment a visitor
// submits the contact form. We set replyTo to the visitor's address so the
// admin can hit Reply directly from their email client if they prefer.
function buildComplaintNotificationHtml(complaint) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #4f46e5;">New complaint received on CodeK</h2>
      <p><strong>From:</strong> ${escapeHtml(complaint.name)} &lt;${escapeHtml(complaint.email)}&gt;</p>
      ${complaint.subject ? `<p><strong>Subject:</strong> ${escapeHtml(complaint.subject)}</p>` : ""}
      <p><strong>Submitted:</strong> ${new Date(complaint.createdAt).toUTCString()}</p>
      <hr>
      <p style="white-space: pre-wrap; line-height: 1.6;">${formatBody(complaint.message)}</p>
      <hr>
      <p style="color: #6b7280; font-size: 12px;">
        Reply directly from the CodeK admin dashboard or hit "Reply" in your email client to
        respond to ${escapeHtml(complaint.email)}.
      </p>
    </div>
  `;
}

// Reply email sent to the visitor when the admin clicks Send Reply in the
// admin panel. The original message is quoted at the bottom for context.
function buildReplyHtml({ complaint, replyMessage }) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <p>Hi ${escapeHtml(complaint.name)},</p>
      <p>Thanks for reaching out to CodeK. Here's our response:</p>
      <div style="border-left: 3px solid #4f46e5; padding-left: 12px; margin: 16px 0; line-height: 1.6;">
        ${formatBody(replyMessage)}
      </div>
      <p>If you have follow-up questions, just reply to this email and we'll continue the thread.</p>
      <p style="margin-top: 24px;">— The CodeK Team</p>
      <hr style="margin-top: 32px;">
      <p style="color: #6b7280; font-size: 12px;">Your original message:</p>
      <blockquote style="color: #6b7280; font-size: 12px; border-left: 2px solid #d1d5db; padding-left: 12px; white-space: pre-wrap;">
        ${formatBody(complaint.message)}
      </blockquote>
    </div>
  `;
}

module.exports = {
  sendEmail,
  buildComplaintNotificationHtml,
  buildReplyHtml,
};
