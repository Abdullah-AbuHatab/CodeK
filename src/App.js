import { Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";

// AOS Animation Library
import AOS from "aos";
import "aos/dist/aos.css";

// Context
import { QuizProvider } from "./context/QuizContext";

// Layout Components (always present, kept eager so the shell paints fast)
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

// Common Components
import ScrollToTop from "./components/common/ScrollToTop";
import PrivateRoute from "./components/common/PrivateRoute";
import FloatingChatBot from "./components/FloatingChatBot";

// Pages — lazy-loaded so each route ships only its own chunk.
const Home = lazy(() => import("./pages/Home/Home"));
const About = lazy(() => import("./pages/About/About"));
const Courses = lazy(() => import("./pages/Courses/Courses"));
const CourseDetails = lazy(() => import("./pages/Courses/CourseDetails"));
const ContactPage = lazy(() => import("./pages/Contact/ContactPage"));
const Quiz = lazy(() => import("./pages/Quiz/Quiz"));
const UniversitySubjectDetails = lazy(() =>
  import("./pages/University/UniversitySubjectDetails"),
);

// Auth Pages
const Login = lazy(() => import("./pages/Auth/Login"));
const Signup = lazy(() => import("./pages/Auth/Signup"));
const Admin = lazy(() => import("./pages/Auth/Admin"));
const AdminManage = lazy(() => import("./pages/Auth/AdminManage"));
const Student = lazy(() => import("./pages/Auth/Student"));

// Lightweight fallback shown while a route's chunk is being fetched.
function RouteLoader() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#94a3b8",
        fontFamily: "Poppins, Cairo, sans-serif",
      }}
    >
      <p>Loading…</p>
    </div>
  );
}

export default function App() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
      <Header />
      <ScrollToTop />
      <QuizProvider>
        <FloatingChatBot />
        <Suspense fallback={<RouteLoader />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Courses Routes */}
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:courseId" element={<CourseDetails />} />
            <Route
              path="/courses/university/:subjectId"
              element={<UniversitySubjectDetails />}
            />

            {/* Quiz Routes - Protected */}
            <Route
              path="/courses/:courseId/quiz"
              element={
                <PrivateRoute roles={["student"]}>
                  <Quiz />
                </PrivateRoute>
              }
            />
            <Route
              path="/courses/university/:courseId/quiz"
              element={
                <PrivateRoute roles={["student"]}>
                  <Quiz />
                </PrivateRoute>
              }
            />

            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes */}
            <Route
              path="/admin"
              element={
                <PrivateRoute roles={["admin"]}>
                  <Admin />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/manage"
              element={
                <PrivateRoute roles={["admin"]}>
                  <AdminManage />
                </PrivateRoute>
              }
            />
            <Route
              path="/student"
              element={
                <PrivateRoute roles={["student"]}>
                  <Student />
                </PrivateRoute>
              }
            />
          </Routes>
        </Suspense>
      </QuizProvider>

      <Footer />
    </>
  );
}
