const mongoose = require("mongoose");

// Each reply the admin sends back to the user is captured here so the
// admin UI can show a thread instead of a flat status flag. We persist the
// Brevo messageId (when available) for traceability and store the error
// when the email send fails so the admin can spot delivery issues.
const replySchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    sentAt: { type: Date, default: Date.now },
    sentTo: { type: String, required: true },
    deliveredVia: { type: String, default: "brevo" },
    brevoMessageId: { type: String },
    error: { type: String },
  },
  { _id: true },
);

const complaintSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, lowercase: true },
    subject: { type: String, trim: true, maxlength: 200 },
    message: { type: String, required: true, maxlength: 2000 },
    status: {
      type: String,
      enum: ["new", "read", "replied"],
      default: "new",
    },
    replies: [replySchema],
  },
  { timestamps: true },
);

complaintSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model("Complaint", complaintSchema);
