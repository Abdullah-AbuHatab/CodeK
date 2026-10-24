const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const path = require("path");
// Tests configure the environment themselves; a developer's backend/.env must
// not leak into them.
if (process.env.NODE_ENV !== "test") {
  require("dotenv").config({ path: path.join(__dirname, ".env") });
}

const quizRoutes = require("./routes/quizRoutes");
const Quiz = require("./models/Quiz");
const Course = require("./models/Course");
const UniversitySubject = require("./models/UniversitySubject");
const Complaint = require("./models/Complaint");
const User = require("./models/User");
const {
  connectWithRetry,
  disconnectDb,
  getDbStatus,
  pingDb,
  requireDb,
} = require("./db");
const { askTutor, AiTutorError } = require("./services/aiTutor");
const {
  sendEmail,
  buildComplaintNotificationHtml,
  buildReplyHtml,
} = require("./services/brevo");
const {
  signupValidator,
  loginValidator,
  chatValidator,
  quizSubmitValidator,
  studentValidator,
  courseValidator,
  universitySubjectValidator,
  questionValidator,
  contactValidator,
  replyValidator,
} = require("./middleware/validators");

const app = express();

// Render (and most PaaS) terminate TLS at a proxy and forward over HTTP.
// Without trusting the proxy, express-rate-limit sees every request as
// coming from the proxy IP and throttles all users together.
app.set("trust proxy", 1);

// 🛡️ Rate limiters
// Auth: protects against brute-force on login/signup.
// Only failed attempts count toward the limit, so a legitimate user who
// logs in correctly never gets locked out by their own activity.
const authLimiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_AUTH_WINDOW_MS) || 15 * 60 * 1000,
  max: Number(process.env.RATE_LIMIT_AUTH_MAX) || 10,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  message: {
    message:
      "Too many failed login attempts from this IP. Please try again in 15 minutes.",
  },
});

// AI: protects the OpenRouter quota from abuse.
const aiLimiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_AI_WINDOW_MS) || 60 * 1000,
  max: Number(process.env.RATE_LIMIT_AI_MAX) || 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    code: "RATE_LIMITED",
    message: "Too many AI requests. Please slow down and try again shortly.",
  },
});

// General API limiter (sane upper bound for everything else).
const apiLimiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_API_WINDOW_MS) || 15 * 60 * 1000,
  max: Number(process.env.RATE_LIMIT_API_MAX) || 300,
  standardHeaders: true,
  legacyHeaders: false,
});

// Contact form: low ceiling so a single visitor can't flood the admin inbox
// (and the Brevo quota) by reposting the form. 5 successful submits per IP
// per 15 minutes is generous for legitimate use.
const contactLimiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_CONTACT_WINDOW_MS) || 15 * 60 * 1000,
  max: Number(process.env.RATE_LIMIT_CONTACT_MAX) || 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Too many messages from this IP. Please try again in 15 minutes.",
  },
});

// 🌐 CORS: only allow trusted origins. Configure via ALLOWED_ORIGINS
// (comma-separated). Defaults to localhost:3000 for local development.
const allowedOrigins = (
  process.env.ALLOWED_ORIGINS || "http://localhost:3000"
)
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no Origin header (curl, mobile apps, server-to-server).
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    // Disallowed origin: respond without CORS headers; the browser will block.
    // We log but don't throw — the request still completes normally.
    console.warn(`⚠️  CORS blocked origin: ${origin}`);
    return callback(null, false);
  },
  credentials: true,
  // PATCH is used by the admin "mark complaint as read" action.
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
};

// 🛡️ Security headers (X-Frame-Options, X-Content-Type-Options, HSTS, etc).
// CSP is intentionally disabled here — it conflicts with the React dev
// server during local development. Re-enable in production with a tight
// directive set tuned to the deployed frontend.
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);
app.disable("x-powered-by");

app.use(cors(corsOptions));
app.use(express.json({ limit: "100kb" }));

// JWT Secret. Its presence is enforced at startup (see `start()` below):
// without it the server refuses to boot instead of running with broken auth.
const JWT_SECRET = process.env.JWT_SECRET;

const isTruthyEnv = (value) =>
  ["1", "true", "yes", "on"].includes(String(value || "").trim().toLowerCase());

// Build a Mongo lookup that matches either the custom `id` field or a real
// MongoDB `_id`. Frontend sometimes sends one and sometimes the other —
// accepting both keeps existing call sites working while we migrate.
const byIdOrSlug = (raw) => {
  const filters = [{ id: raw }];
  if (mongoose.Types.ObjectId.isValid(raw)) {
    filters.push({ _id: raw });
  }
  return { $or: filters };
};

// Middleware للتحقق من الـ Token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token required" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    req.user = user;
    next();
  });
};

// Routes

// Liveness — namespaced under /api so the root path can serve the SPA in
// monolith deployments. Render's healthCheckPath points here, so it must stay
// 200 even while the database is down (otherwise Render would restart a
// healthy web process), and it is registered before the API rate limiter so
// health probes are never throttled.
app.get("/api/health", (req, res) => {
  res.json({
    message: "CodeK Backend API is running",
    status: "OK",
    db: getDbStatus(),
    uptimeSeconds: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

app.use("/api", apiLimiter);

// Readiness / deep check — sends a real ping to MongoDB. Used by the GitHub
// keep-alive workflow so the Atlas Free cluster sees regular connections.
app.get("/api/health/db", async (req, res) => {
  try {
    const { latencyMs } = await pingDb();
    res.json({
      status: "OK",
      db: "connected",
      latencyMs,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.warn(`[health] DB ping failed: ${error.message}`);
    res.set("Retry-After", "30");
    res.status(503).json({
      status: "ERROR",
      code: "DB_UNAVAILABLE",
      db: getDbStatus(),
      timestamp: new Date().toISOString(),
    });
  }
});

// Optional sign-in requirement for the AI tutor (CHAT_REQUIRE_AUTH=true,
// default off). The flag is read per request so tests can toggle it.
const chatAuth = (req, res, next) => {
  if (!isTruthyEnv(process.env.CHAT_REQUIRE_AUTH)) return next();

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      code: "AUTH_REQUIRED",
      message: "Please log in to use the AI tutor.",
    });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({
        code: "AUTH_INVALID",
        message: "Your session has expired. Please log in again.",
      });
    }
    req.user = user;
    next();
  });
};

// 🤖 AI tutor. Body: { message, history? } — see services/aiTutor.js.
app.post("/api/chat", aiLimiter, chatAuth, chatValidator, async (req, res) => {
  try {
    const { reply, model, fallbackUsed } = await askTutor({
      message: req.body.message,
      history: req.body.history,
    });
    if (fallbackUsed) {
      console.warn(`[chat] answered by fallback model ${fallbackUsed} (primary ${model} unavailable)`);
    }
    // `response` is kept alongside `reply` for older clients.
    res.json({ reply, response: reply });
  } catch (error) {
    if (error instanceof AiTutorError) {
      console.error(`[chat] ${error.code}: ${error.detail || error.message}`);
      return res.status(error.status).json({
        code: error.code,
        message: error.message,
      });
    }
    console.error("[chat] Unexpected error:", error);
    res.status(500).json({
      code: "CHAT_FAILED",
      message: "Failed to process the chat request.",
    });
  }
});

// Everything below needs the database. While it is unreachable, answer a fast
// 503 instead of letting requests hang on Mongoose's command buffer.
app.use("/api", requireDb);
app.use("/api/quizzes", quizRoutes);

// 1. Sign Up
app.post("/api/auth/signup", authLimiter, signupValidator, async (req, res) => {
  try {
    const { username, password, fullName, email, phone } = req.body;

    // Validation
    if (!username || !password || !fullName || !email || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate password length for regular users (not admin)
    if (password.length <= 6) {
      return res
        .status(400)
        .json({ message: "Password must be more than 6 characters" });
    }

    // Check if user exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Check if email exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      username,
      password: hashedPassword,
      fullName,
      email,
      phone,
      role: "student",
      courses: [],
      quizResults: [],
    });

    await user.save();

    // Generate token
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        courses: user.courses,
        quizResults: user.quizResults,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// 2. Login
app.post("/api/auth/login", authLimiter, loginValidator, async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find user (admin and students share the same flow)
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        courses: user.courses,
        quizResults: user.quizResults,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// 3. Get Current User
app.get("/api/auth/me", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// 4. Submit Quiz Result
app.post("/api/quiz/submit", authenticateToken, quizSubmitValidator, async (req, res) => {
  try {
    const { courseId, score, total } = req.body;

    // Validation
    if (!courseId || score === undefined || !total) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check the role, not a hard-coded username: the admin account's name now
    // comes from ADMIN_USERNAME.
    if (req.user.role === "admin") {
      return res.status(403).json({ message: "Admin cannot submit quizzes" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.quizResults.push({
      courseId,
      score,
      total,
      date: new Date(),
    });

    await user.save();

    res.json({
      message: "Quiz result saved successfully",
      quizResults: user.quizResults,
    });
  } catch (error) {
    console.error("Submit quiz error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// 5. Get All Students (Admin only)
app.get("/api/admin/students", authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admin only" });
    }

    const students = await User.find({ role: "student" }).select("-password");
    res.json(students);
  } catch (error) {
    console.error("Get students error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// 6. Get Statistics (Admin only)
app.get("/api/admin/stats", authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admin only" });
    }

    const totalStudents = await User.countDocuments({ role: "student" });
    const allStudents = await User.find({ role: "student" });

    const totalQuizzes = allStudents.reduce(
      (sum, student) => sum + (student.quizResults?.length || 0),
      0,
    );

    res.json({
      totalStudents,
      totalQuizzes,
    });
  } catch (error) {
    console.error("Get stats error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ==================== STUDENT CRUD ROUTES ====================

// Get all students
app.get("/api/students", authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admin only" });
    }
    const students = await User.find({ role: "student" }).select("-password");
    res.json(students);
  } catch (error) {
    console.error("Get students error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Create student
app.post("/api/students", authenticateToken, studentValidator, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admin only" });
    }

    const { fullName, username, email, phone, password, courses } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      fullName,
      username,
      email,
      phone,
      password: hashedPassword,
      role: "student",
      courses: courses || [],
    });

    await user.save();
    const userResponse = user.toObject();
    delete userResponse.password;
    res.status(201).json(userResponse);
  } catch (error) {
    console.error("Create student error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update student
app.put("/api/students/:id", authenticateToken, studentValidator, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admin only" });
    }

    const { fullName, username, email, phone, password, courses } = req.body;
    const updateData = { fullName, username, email, phone, courses };

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const user = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Update student error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete student
app.delete("/api/students/:id", authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admin only" });
    }

    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Delete student error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ==================== COURSE CRUD ROUTES ====================

// Get all courses (PUBLIC - for students)
app.get("/api/courses/public/all", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    console.error("Get courses error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all courses (ADMIN - authenticated)
app.get("/api/courses", authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admin only" });
    }
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    console.error("Get courses error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Create course
app.post("/api/courses", authenticateToken, courseValidator, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admin only" });
    }

    // Ensure course has a valid ID
    const courseData = { ...req.body };
    if (!courseData.id || courseData.id.trim() === "") {
      // Auto-generate ID from title if not provided
      courseData.id = courseData.title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
    }

    const course = new Course(courseData);
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    console.error("Create course error:", error);
    if (error.code === 11000) {
      res.status(400).json({ message: "Course ID already exists" });
    } else {
      res.status(500).json({ message: "Server error" });
    }
  }
});

// Update course
app.put("/api/courses/:id", authenticateToken, courseValidator, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admin only" });
    }

    const course = await Course.findOneAndUpdate(
      byIdOrSlug(req.params.id),
      req.body,
      { new: true },
    );

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(course);
  } catch (error) {
    console.error("Update course error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete course
app.delete("/api/courses/:id", authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admin only" });
    }

    const course = await Course.findOneAndDelete(byIdOrSlug(req.params.id));
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Delete course error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ==================== UNIVERSITY SUBJECTS CRUD ROUTES ====================

// Get all university subjects
app.get("/api/university-subjects", authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admin only" });
    }
    const subjects = await UniversitySubject.find();
    res.json(subjects);
  } catch (error) {
    console.error("Get university subjects error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Create university subject
app.post("/api/university-subjects", authenticateToken, universitySubjectValidator, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admin only" });
    }

    const subject = new UniversitySubject(req.body);
    await subject.save();
    res.status(201).json(subject);
  } catch (error) {
    console.error("Create university subject error:", error);
    if (error.code === 11000) {
      res.status(400).json({ message: "Subject ID already exists" });
    } else {
      res.status(500).json({ message: "Server error" });
    }
  }
});

// Update university subject
app.put("/api/university-subjects/:id", authenticateToken, universitySubjectValidator, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admin only" });
    }

    const subject = await UniversitySubject.findOneAndUpdate(
      byIdOrSlug(req.params.id),
      req.body,
      { new: true },
    );

    if (!subject) {
      return res.status(404).json({ message: "University subject not found" });
    }

    res.json(subject);
  } catch (error) {
    console.error("Update university subject error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete university subject
app.delete(
  "/api/university-subjects/:id",
  authenticateToken,
  async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied: Admin only" });
      }

      const subject = await UniversitySubject.findOneAndDelete(
        byIdOrSlug(req.params.id),
      );
      if (!subject) {
        return res
          .status(404)
          .json({ message: "University subject not found" });
      }

      res.json({ message: "University subject deleted successfully" });
    } catch (error) {
      console.error("Delete university subject error:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
);

// ==================== QUIZ QUESTIONS CRUD ROUTES ====================

// Get questions for a course
app.get(
  "/api/courses/:courseId/questions",
  authenticateToken,
  async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied: Admin only" });
      }

      const quiz = await Quiz.findOne({ courseId: req.params.courseId });
      if (!quiz) {
        return res.json([]); // Return empty array if no quiz exists
      }

      res.json(quiz.questions);
    } catch (error) {
      console.error("Get questions error:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
);

// Add question to course
app.post(
  "/api/courses/:courseId/questions",
  authenticateToken,
  questionValidator,
  async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied: Admin only" });
      }

      let quiz = await Quiz.findOne({ courseId: req.params.courseId });
      if (!quiz) {
        quiz = new Quiz({ courseId: req.params.courseId, questions: [] });
      }

      const newQuestion = { ...req.body, _id: undefined }; // Remove _id if present
      quiz.questions.push(newQuestion);
      await quiz.save();

      res.status(201).json(quiz.questions[quiz.questions.length - 1]);
    } catch (error) {
      console.error("Add question error:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
);

// Update question in course
app.put(
  "/api/courses/:courseId/questions/:questionId",
  authenticateToken,
  questionValidator,
  async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied: Admin only" });
      }

      const quiz = await Quiz.findOne({ courseId: req.params.courseId });
      if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
      }

      const questionIndex = quiz.questions.findIndex(
        (q) => q._id.toString() === req.params.questionId,
      );
      if (questionIndex === -1) {
        return res.status(404).json({ message: "Question not found" });
      }

      quiz.questions[questionIndex] = {
        ...quiz.questions[questionIndex],
        ...req.body,
      };
      await quiz.save();

      res.json(quiz.questions[questionIndex]);
    } catch (error) {
      console.error("Update question error:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
);

// Delete question from course
app.delete(
  "/api/courses/:courseId/questions/:questionId",
  authenticateToken,
  async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied: Admin only" });
      }

      const quiz = await Quiz.findOne({ courseId: req.params.courseId });
      if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
      }

      const questionIndex = quiz.questions.findIndex(
        (q) => q._id.toString() === req.params.questionId,
      );
      if (questionIndex === -1) {
        return res.status(404).json({ message: "Question not found" });
      }

      quiz.questions.splice(questionIndex, 1);
      await quiz.save();

      res.json({ message: "Question deleted successfully" });
    } catch (error) {
      console.error("Delete question error:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
);

// ==================== COMPLAINTS / CONTACT ROUTES ====================

// Public: visitor submits the contact form. We persist the complaint first
// so it's never lost, then attempt the Brevo notification as best-effort.
// The response is the same whether email succeeds or fails — UX-wise the
// visitor only cares that we got the message.
app.post("/api/contact", contactLimiter, contactValidator, async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const complaint = new Complaint({
      name,
      email,
      subject: subject || "",
      message,
    });
    await complaint.save();

    const recipient = process.env.CONTACT_RECIPIENT_EMAIL;
    if (recipient) {
      const emailSubject = subject
        ? `[CodeK Contact] ${subject}`
        : `[CodeK Contact] New message from ${name}`;
      sendEmail({
        to: recipient,
        subject: emailSubject,
        htmlContent: buildComplaintNotificationHtml(complaint),
        replyTo: email,
      }).then((result) => {
        if (!result.ok && !result.skipped) {
          console.warn(
            `⚠️  Complaint ${complaint._id} saved but admin notification failed: ${result.error}`,
          );
        }
      });
    } else {
      console.warn(
        "⚠️  CONTACT_RECIPIENT_EMAIL not set — complaint saved without admin notification",
      );
    }

    res.status(201).json({
      message: "Your message has been received. We'll get back to you soon.",
      id: complaint._id,
    });
  } catch (error) {
    console.error("Submit complaint error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Admin list: returns every complaint, newest first. The dashboard renders
// a status badge, so we don't paginate yet — at the volumes a graduation
// project sees, a single fetch is fine.
app.get("/api/admin/complaints", authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admin only" });
    }
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    console.error("List complaints error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Admin: mark as read. Used when the admin opens a complaint detail view
// so unread badges clear without forcing them to reply.
app.patch(
  "/api/admin/complaints/:id/read",
  authenticateToken,
  async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied: Admin only" });
      }

      const complaint = await Complaint.findById(req.params.id);
      if (!complaint) {
        return res.status(404).json({ message: "Complaint not found" });
      }

      // Only bump from "new" — once an admin has replied, status stays
      // "replied" instead of regressing to "read" on a re-open.
      if (complaint.status === "new") {
        complaint.status = "read";
        await complaint.save();
      }

      res.json(complaint);
    } catch (error) {
      console.error("Mark complaint read error:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
);

// Admin: send a reply. The email goes via Brevo; whether it succeeds or
// fails, we still record the reply on the complaint document so the admin
// has a permanent log (with the error captured if delivery failed).
app.post(
  "/api/admin/complaints/:id/reply",
  authenticateToken,
  replyValidator,
  async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied: Admin only" });
      }

      const complaint = await Complaint.findById(req.params.id);
      if (!complaint) {
        return res.status(404).json({ message: "Complaint not found" });
      }

      const { message } = req.body;
      const result = await sendEmail({
        to: complaint.email,
        subject: complaint.subject
          ? `Re: ${complaint.subject}`
          : "Re: Your message to CodeK",
        htmlContent: buildReplyHtml({ complaint, replyMessage: message }),
      });

      complaint.replies.push({
        message,
        sentTo: complaint.email,
        deliveredVia: result.skipped ? "not-sent" : "brevo",
        brevoMessageId: result.messageId,
        error: result.ok ? undefined : result.error,
      });
      complaint.status = "replied";
      await complaint.save();

      if (result.ok) {
        return res.json({
          message: "Reply sent successfully",
          complaint,
        });
      }

      // Email failed but the reply is logged. Surface the failure so the
      // admin UI can show a "saved but not delivered" warning.
      return res.status(502).json({
        message: result.skipped
          ? "Reply saved, but Brevo is not configured on the server."
          : `Reply saved, but email delivery failed: ${result.error}`,
        complaint,
      });
    } catch (error) {
      console.error("Reply to complaint error:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
);

// Admin: delete a complaint and its reply history.
app.delete(
  "/api/admin/complaints/:id",
  authenticateToken,
  async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied: Admin only" });
      }

      const complaint = await Complaint.findByIdAndDelete(req.params.id);
      if (!complaint) {
        return res.status(404).json({ message: "Complaint not found" });
      }

      res.json({ message: "Complaint deleted successfully" });
    } catch (error) {
      console.error("Delete complaint error:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
);

// Helper: Fix courses without proper IDs
app.post("/api/admin/fix-course-ids", authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admin only" });
    }

    const courses = await Course.find({
      $or: [{ id: { $exists: false } }, { id: "" }],
    });
    let updated = 0;

    for (const course of courses) {
      if (!course.id || course.id.trim() === "") {
        // Auto-generate ID from title
        course.id = course.title
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "");
        await course.save();
        updated++;
      }
    }

    res.json({
      message: `Fixed ${updated} courses with missing IDs`,
      fixed: updated,
    });
  } catch (error) {
    console.error("Fix course IDs error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// 🖥️ Serve the built React app (production only).
// In production the CRA build output sits at <repo>/build, one level above
// the backend folder. Any non-/api request gets the SPA shell so client-side
// routing (React Router) keeps working on hard reloads.
if (process.env.NODE_ENV === "production") {
  const buildPath = path.join(__dirname, "..", "build");
  app.use(express.static(buildPath));

  // A request for a missing static file (e.g. a removed lecture PDF or a
  // stale JS chunk) must 404 instead of receiving index.html under a .pdf/.js
  // name. Anything else is a client-side route and gets the SPA shell.
  const STATIC_FILE_EXT =
    /\.(pdf|pptx?|docx?|xlsx?|zip|js|mjs|css|map|json|txt|xml|png|jpe?g|gif|webp|svg|ico|woff2?|ttf|eot|mp4|webm)$/i;
  app.get(/^\/(?!api\/).*/, (req, res, next) => {
    if (STATIC_FILE_EXT.test(req.path)) return next();
    res.sendFile(path.join(buildPath, "index.html"));
  });
}

// 404 Handler — only reaches API routes (and anything else in dev).
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error Handler
app.use((err, req, res, next) => {
  // Malformed or oversized JSON bodies are client errors, not server errors.
  if (err && err.type === "entity.parse.failed") {
    return res
      .status(400)
      .json({ code: "INVALID_JSON", message: "Request body is not valid JSON" });
  }
  if (err && err.type === "entity.too.large") {
    return res
      .status(413)
      .json({ code: "PAYLOAD_TOO_LARGE", message: "Request body is too large" });
  }
  console.error("Server error:", err);
  res.status(500).json({ message: "Internal server error" });
});

// Start Server
// The HTTP listener starts first and the database connects in the background,
// so the React app and /api/health stay up while MongoDB is unreachable.
function start() {
  if (!JWT_SECRET) {
    console.error(
      "\n" +
        "FATAL: JWT_SECRET is not set. Refusing to start, because every login and\n" +
        "protected route depends on it.\n" +
        "  - Render: Dashboard → codek → Environment → add JWT_SECRET\n" +
        "  - Local:  add JWT_SECRET to backend/.env (see backend/.env.example)\n" +
        "  Generate one with: node -e \"console.log(require('crypto').randomBytes(64).toString('hex'))\"\n",
    );
    process.exit(1);
  }

  const PORT = process.env.PORT || 5000;
  const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📡 Environment: ${process.env.NODE_ENV || "development"}`);
  });

  connectWithRetry(process.env.MONGODB_URI);

  // Render sends SIGTERM on deploys and spin-downs.
  const shutdown = (signal) => {
    console.log(`${signal} received — shutting down`);
    server.close(() => {
      disconnectDb().finally(() => process.exit(0));
    });
    setTimeout(() => process.exit(0), 10000).unref();
  };
  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));

  return server;
}

if (require.main === module) {
  start();
}

module.exports = { app, start };
