const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const quizRoutes = require("./routes/quizRoutes");
const Quiz = require("./models/Quiz");
const Course = require("./models/Course");
const UniversitySubject = require("./models/UniversitySubject");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/quizzes", quizRoutes);

// 🤖 AI Configuration
const AI_API_KEY = process.env.OPENROUTER_API_KEY;
const AI_MODEL = "gpt-3.5-turbo";

// 🔹 MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");
    console.log("📊 Database:", mongoose.connection.name);
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });


// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  name: { type: String }, // Kept for backward compatibility
  role: { type: String, enum: ["student", "admin"], default: "student" },
  courses: [{ type: String }],
  quizResults: [
    {
      courseId: String,
      score: Number,
      total: Number,
      date: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error("❌ JWT_SECRET is not defined in .env file");
  process.exit(1);
}

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

// Health Check
app.get("/", (req, res) => {
  res.json({
    message: "CodeK Backend API is running",
    status: "OK",
    timestamp: new Date().toISOString(),
  });
});

// 🤖 Test Chat Endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    if (!AI_API_KEY) {
      return res.status(500).json({ message: "AI API key not configured" });
    }

    // System instruction for the AI
    const systemInstruction =
      "You are a professional coding tutor for CodeK. Answer in English by default. Use Arabic only if the user asks in Arabic. Provide hints for questions without giving the direct answer.";

    const response = await fetch(
      `https://openrouter.ai/api/v1/chat/completions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${AI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: AI_MODEL,
          messages: [
            { role: "system", content: systemInstruction },
            { role: "user", content: prompt },
          ],
          max_tokens: 800,
          temperature: 0.6,
        }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("AI API Error:", errorData);
      return res.status(response.status).json({
        error: errorData.error?.message || "AI service error",
      });
    }

    const data = await response.json();
    const botResponse =
      data.choices?.[0]?.message?.content || "I couldn't generate a response";

    // Return response in both formats for compatibility
    res.json({
      reply: botResponse,
      response: botResponse,
    });
  } catch (error) {
    console.error("Chat Error:", error);
    res.status(500).json({
      error: error.message || "Failed to process chat request",
    });
  }
});

// 1. Sign Up
app.post("/api/auth/signup", async (req, res) => {
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
app.post("/api/auth/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check admin credentials
    if (username === "admin" && password === "123") {
      const token = jwt.sign({ username: "admin", role: "admin" }, JWT_SECRET, {
        expiresIn: "7d",
      });

      return res.json({
        token,
        user: {
          username: "admin",
          fullName: "Admin User",
          email: "admin@codek.com",
          role: "admin",
          quizResults: [],
        },
      });
    }

    // Find user
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
    if (req.user.username === "admin") {
      return res.json({
        username: "admin",
        name: "Admin User",
        role: "admin",
        quizResults: [],
      });
    }

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
app.post("/api/quiz/submit", authenticateToken, async (req, res) => {
  try {
    const { courseId, score, total } = req.body;

    // Validation
    if (!courseId || score === undefined || !total) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (req.user.username === "admin") {
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
app.post("/api/students", authenticateToken, async (req, res) => {
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
app.put("/api/students/:id", authenticateToken, async (req, res) => {
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
app.post("/api/courses", authenticateToken, async (req, res) => {
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
app.put("/api/courses/:id", authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admin only" });
    }

    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

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

    const course = await Course.findByIdAndDelete(req.params.id);
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
app.post("/api/university-subjects", authenticateToken, async (req, res) => {
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
app.put("/api/university-subjects/:id", authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admin only" });
    }

    const subject = await UniversitySubject.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
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

      const subject = await UniversitySubject.findByIdAndDelete(req.params.id);
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

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ message: "Internal server error" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV || "development"}`);
});
