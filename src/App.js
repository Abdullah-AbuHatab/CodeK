import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";

// Context
import { QuizProvider } from "./context/QuizContext";

// Layout Components
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

// Common Components
import ScrollToTop from "./components/common/ScrollToTop";
import PrivateRoute from "./components/common/PrivateRoute";
import FloatingChatBot from "./components/FloatingChatBot";

// Pages
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Courses from "./pages/Courses/Courses";
import CourseDetails from "./pages/Courses/CourseDetails";
import ContactPage from "./pages/Contact/ContactPage";
import Quiz from "./pages/Quiz/Quiz";
import UniversitySubjectDetails from "./pages/University/UniversitySubjectDetails";

// Auth Pages
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Admin from "./pages/Auth/Admin";
import AdminManage from "./pages/Auth/AdminManage";
import Student from "./pages/Auth/Student";

// AOS Animation Library
import AOS from "aos";
import "aos/dist/aos.css";

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
      </QuizProvider>

      <Footer />
    </>
  );
}
