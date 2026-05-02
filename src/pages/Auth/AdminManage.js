import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";
import Notification from "../../components/common/Notification";
import StudentsTab from "./admin/StudentsTab";
import StudentForm from "./admin/StudentForm";
import CoursesTab from "./admin/CoursesTab";
import QuizQuestionsManager from "./admin/QuizQuestionsManager";
import CourseForm from "./admin/CourseForm";
import QuestionForm from "./admin/QuestionForm";
import QuestionWizard from "./admin/QuestionWizard";
import "./AdminManage.css";

export default function AdminManage() {
  const [activeTab, setActiveTab] = useState("students");
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [universitySubjects, setUniversitySubjects] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [selectedCourseForQuiz, setSelectedCourseForQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [editingCourse, setEditingCourse] = useState(null);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [editingUniversitySubject, setEditingUniversitySubject] =
    useState(null);
  const navigate = useNavigate();

  // Wizard state for adding multiple questions
  const [wizardMode, setWizardMode] = useState(false);
  const [totalQuestions, setTotalQuestions] = useState(1);
  const [currentQuestionStep, setCurrentQuestionStep] = useState(0);
  const [questionsToAdd, setQuestionsToAdd] = useState([]);
  const [wizardErrors, setWizardErrors] = useState({});

  // Toast/notification state
  const [notification, setNotification] = useState(null);
  // Stable callback so <Notification>'s effect doesn't re-trigger on every render.
  const dismissNotification = useCallback(() => setNotification(null), []);

  // Form state for students
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    courses: [],
  });

  // Form state for courses
  const [courseFormData, setCourseFormData] = useState({
    id: "",
    title: "",
    category: "",
    level: "Beginner",
    duration: "",
    badge: "",
    shortDescription: "",
    longDescription: "",
    prerequisitesShort: "",
    topics: "",
    objectives: "",
    assessmentInstructions: "",
    assessment: {
      numQuestions: 10,
      estimatedTime: "15-20 min",
      analysis: true,
      aiRecommendations: true,
    },
  });

  // Form state for questions
  const [questionFormData, setQuestionFormData] = useState({
    id: 0,
    question: "",
    options: ["", "", "", ""],
    answer: "",
  });

  // Form state for university subjects
  const [universitySubjectFormData, setUniversitySubjectFormData] = useState({
    id: "",
    title: "",
    semester: "",
    badge: "",
    longDescription: "",
    chapters: [],
    objectives: [],
    prerequisites: "",
    quiz: {
      numQuestions: 15,
      estimatedTime: "20-30 min",
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (!token || !user || user.role !== "admin") {
      navigate("/login");
      return;
    }
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [studentsRes, coursesRes, universityRes] = await Promise.all([
        fetch(`${API_URL}/students`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }),
        fetch(`${API_URL}/courses`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }),
        fetch(`${API_URL}/university-subjects`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }),
      ]);

      if (studentsRes.ok) setStudents(await studentsRes.json());
      if (coursesRes.ok) setCourses(await coursesRes.json());
      if (universityRes.ok) setUniversitySubjects(await universityRes.json());
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add Student
  const handleAddStudent = () => {
    setModalType("student");
    setEditingStudent(null);
    setFormData({
      fullName: "",
      username: "",
      email: "",
      phone: "",
      password: "",
      courses: [],
    });
    setShowModal(true);
  };

  // Edit Student
  const handleEditStudent = (student) => {
    setModalType("student");
    setEditingStudent(student);
    setFormData({
      fullName: student.fullName || "",
      username: student.username || "",
      email: student.email || "",
      phone: student.phone || "",
      password: "",
      courses: student.courses || [],
    });
    setShowModal(true);
  };

  // Save Student (Add or Update)
  const handleSaveStudent = async (e) => {
    e.preventDefault();
    try {
      const method = editingStudent ? "PUT" : "POST";
      const url = editingStudent
        ? `${API_URL}/students/${editingStudent._id}`
        : `${API_URL}/students`;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        await fetchData();
        setShowModal(false);
        setModalType(null);
      } else {
        alert("Error saving student");
      }
    } catch (error) {
      console.error("Error saving student:", error);
    }
  };

  // Delete Student
  const handleDeleteStudent = async (studentId, studentName) => {
    if (!window.confirm(`Are you sure you want to delete ${studentName}?`))
      return;
    try {
      const res = await fetch(`${API_URL}/students/${studentId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (res.ok) {
        await fetchData();
      } else {
        alert("Error deleting student");
      }
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  // ==================== COURSE HANDLERS ====================

  const handleAddCourse = () => {
    setModalType("course");
    setEditingCourse(null);
    setCourseFormData({
      id: "",
      title: "",
      category: "",
      level: "Beginner",
      duration: "",
      badge: "",
      shortDescription: "",
      longDescription: "",
      prerequisitesShort: "",
      topics: "",
      objectives: "",
      assessmentInstructions: "",
      assessment: {
        numQuestions: 10,
        estimatedTime: "15-20 min",
        analysis: true,
        aiRecommendations: true,
      },
    });
    setShowModal(true);
  };

  const handleEditCourse = (course) => {
    setModalType("course");
    setEditingCourse(course);
    setCourseFormData(course);
    setShowModal(true);
  };

  const handleSaveCourse = async (e) => {
    e.preventDefault();
    try {
      const method = editingCourse ? "PUT" : "POST";
      const url = editingCourse
        ? `${API_URL}/courses/${editingCourse._id}`
        : `${API_URL}/courses`;

      // Auto-generate ID from title if empty
      let courseDataToSave = { ...courseFormData };
      if (!courseDataToSave.id || courseDataToSave.id.trim() === "") {
        courseDataToSave.id = courseDataToSave.title
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "");
      }

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(courseDataToSave),
      });

      if (res.ok) {
        const successMessage = editingCourse
          ? `Course "${courseDataToSave.title}" updated successfully!`
          : `Course "${courseDataToSave.title}" added successfully!`;
        
        setNotification({
          type: "success",
          message: successMessage,
        });

        await fetchData();
        setShowModal(false);
      } else {
        const errorData = await res.json().catch(() => ({}));
        setNotification({
          type: "error",
          message: errorData.message || "Error saving course",
        });
      }
    } catch (error) {
      console.error("Error saving course:", error);
      setNotification({
        type: "error",
        message: "Error saving course. Please try again.",
      });
    }
  };

  const handleDeleteCourse = async (courseId, courseTitle) => {
    if (!window.confirm(`Are you sure you want to delete ${courseTitle}?`))
      return;
    try {
      const res = await fetch(`${API_URL}/courses/${courseId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (res.ok) {
        await fetchData();
      } else {
        alert("Error deleting course");
      }
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  // ==================== UNIVERSITY SUBJECT HANDLERS ====================

  const handleAddUniversitySubject = () => {
    setModalType("university");
    setEditingUniversitySubject(null);
    setUniversitySubjectFormData({
      id: "",
      title: "",
      semester: "",
      badge: "",
      longDescription: "",
      chapters: [],
      objectives: [],
      prerequisites: "",
      quiz: {
        numQuestions: 15,
        estimatedTime: "20-30 min",
      },
    });
    setShowModal(true);
  };

  const handleEditUniversitySubject = (subject) => {
    setModalType("university");
    setEditingUniversitySubject(subject);
    setUniversitySubjectFormData(subject);
    setShowModal(true);
  };

  const handleSaveUniversitySubject = async (e) => {
    e.preventDefault();
    try {
      const method = editingUniversitySubject ? "PUT" : "POST";
      const url = editingUniversitySubject
        ? `${API_URL}/university-subjects/${editingUniversitySubject._id}`
        : `${API_URL}/university-subjects`;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(universitySubjectFormData),
      });

      if (res.ok) {
        await fetchData();
        setShowModal(false);
      } else {
        alert("Error saving university subject");
      }
    } catch (error) {
      console.error("Error saving university subject:", error);
    }
  };

  const handleDeleteUniversitySubject = async (subjectId, subjectTitle) => {
    if (!window.confirm(`Are you sure you want to delete ${subjectTitle}?`))
      return;
    try {
      const res = await fetch(`${API_URL}/university-subjects/${subjectId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (res.ok) {
        await fetchData();
      } else {
        alert("Error deleting university subject");
      }
    } catch (error) {
      console.error("Error deleting university subject:", error);
    }
  };

  // ==================== QUIZ HANDLERS ====================

  const handleManageQuiz = async (courseId) => {
    setSelectedCourseForQuiz(courseId);
    try {
      const res = await fetch(`${API_URL}/courses/${courseId}/questions`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (res.ok) {
        setQuizzes(await res.json());
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleAddQuestion = () => {
    // Start wizard mode - user selects number of questions first
    setWizardMode(true);
    setTotalQuestions(1);
    setCurrentQuestionStep(0);
    setQuestionsToAdd([]);
    setWizardErrors({});
    setModalType("question");
    setEditingQuestion(null);
    setQuestionFormData({
      id: 0,
      question: "",
      options: ["", "", "", ""],
      answer: "",
    });
    setShowModal(true);
  };

  const handleEditQuestion = (question) => {
    setModalType("question");
    setEditingQuestion(question);
    setQuestionFormData(question);
    setShowModal(true);
  };

  const handleSaveQuestion = async (e) => {
    e.preventDefault();
    try {
      const method = editingQuestion ? "PUT" : "POST";
      const url = editingQuestion
        ? `${API_URL}/courses/${selectedCourseForQuiz}/questions/${editingQuestion._id}`
        : `${API_URL}/courses/${selectedCourseForQuiz}/questions`;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(questionFormData),
      });

      if (res.ok) {
        await handleManageQuiz(selectedCourseForQuiz);
        setShowModal(false);
      } else {
        alert("Error saving question");
      }
    } catch (error) {
      console.error("Error saving question:", error);
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    if (!window.confirm("Are you sure you want to delete this question?"))
      return;
    try {
      const res = await fetch(
        `${API_URL}/courses/${selectedCourseForQuiz}/questions/${questionId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      if (res.ok) {
        await handleManageQuiz(selectedCourseForQuiz);
      } else {
        alert("Error deleting question");
      }
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  // ==================== WIZARD HANDLERS ====================

  const handleStartWizard = () => {
    if (totalQuestions < 1 || !Number.isInteger(totalQuestions)) {
      setWizardErrors({
        totalQuestions: "Please enter a number between 1 and 100",
      });
      return;
    }
    if (totalQuestions > 100) {
      setWizardErrors({ totalQuestions: "Maximum 100 questions per session" });
      return;
    }
    // Initialize questions array for wizard
    const newQuestions = Array.from({ length: totalQuestions }, () => ({
      question: "",
      options: ["", "", "", ""],
      answer: "",
    }));
    setQuestionsToAdd(newQuestions);
    setCurrentQuestionStep(0);
    setWizardErrors({});
  };

  const validateCurrentQuestion = () => {
    const errors = {};

    if (!questionFormData.question || !questionFormData.question.trim()) {
      errors.question = "Question is required";
    }

    const validOptions = questionFormData.options.filter(
      (opt) => opt && opt.trim(),
    );
    if (validOptions.length < 2) {
      errors.options = "At least 2 options are required";
    }

    if (!questionFormData.answer || !questionFormData.answer.trim()) {
      errors.answer = "Correct answer is required";
    } else if (!questionFormData.options.includes(questionFormData.answer)) {
      errors.answer = "Correct answer must be one of the options";
    }

    setWizardErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextQuestion = async () => {
    if (!validateCurrentQuestion()) {
      return;
    }

    // Save current question
    const updatedQuestions = [...questionsToAdd];
    updatedQuestions[currentQuestionStep] = questionFormData;
    setQuestionsToAdd(updatedQuestions);

    // Move to next question or finish
    if (currentQuestionStep < totalQuestions - 1) {
      setCurrentQuestionStep(currentQuestionStep + 1);
      // Reset form for next question
      setQuestionFormData({
        question: "",
        options: ["", "", "", ""],
        answer: "",
      });
      setWizardErrors({});
    } else {
      // Last question - proceed to submit all
      await handleFinishWizard(updatedQuestions);
    }
  };

  const handleFinishWizard = async (questionsToSubmit) => {
    try {
      // Submit all questions
      let successCount = 0;
      for (const question of questionsToSubmit) {
        const res = await fetch(
          `${API_URL}/courses/${selectedCourseForQuiz}/questions`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(question),
          },
        );
        if (res.ok) {
          successCount++;
        }
      }

      if (successCount === questionsToSubmit.length) {
        alert(`Successfully added all ${successCount} questions!`);
        await handleManageQuiz(selectedCourseForQuiz);
        setShowModal(false);
        setWizardMode(false);
      } else {
        alert(
          `Added ${successCount} of ${questionsToSubmit.length} questions. Some may have failed.`,
        );
      }
    } catch (error) {
      console.error("Error finishing wizard:", error);
      alert("Error saving questions. Please try again.");
    }
  };

  const handleCancelWizard = () => {
    setShowModal(false);
    setWizardMode(false);
    setWizardErrors({});
    setQuestionFormData({
      id: 0,
      question: "",
      options: ["", "", "", ""],
      answer: "",
    });
  };

  const filteredCourses = courses.filter(
    (course) =>
      !course.isUniversity &&
      (course?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course?.category?.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  const filteredStudents = students.filter(
    (student) =>
      student?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student?.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student?.email?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredUniversitySubjects = universitySubjects.filter(
    (subject) =>
      subject?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject?.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject?.semester?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Create course map for titles
  const courseMap = courses.reduce((map, course) => {
    map[course.id] = course.title;
    return map;
  }, {});

  if (loading) {
    return (
      <div className="admin-manage-page">
        <div className="loading-container">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-manage-page">
      <div className="manage-container">
        <Notification
          notification={notification}
          onDismiss={dismissNotification}
        />


        {/* Header */}
        <div className="manage-header">
          <h1>System Management</h1>
          <button className="back-btn" onClick={() => navigate("/admin")}>
            Back to Dashboard
          </button>
        </div>

        {/* Tabs */}
        <div className="tabs">
          <button
            className={`tab ${activeTab === "students" ? "active" : ""}`}
            onClick={() => setActiveTab("students")}
          >
            Students
          </button>
          <button
            className={`tab ${activeTab === "courses" ? "active" : ""}`}
            onClick={() => setActiveTab("courses")}
          >
            Courses
          </button>
          <button
            className={`tab ${activeTab === "university" ? "active" : ""}`}
            onClick={() => setActiveTab("university")}
          >
            University Subjects
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {/* Students Tab */}
          {activeTab === "students" && (
            <StudentsTab
              students={filteredStudents}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              courseMap={courseMap}
              onAdd={handleAddStudent}
              onEdit={handleEditStudent}
              onDelete={handleDeleteStudent}
            />
          )}

          {/* Courses Tab */}
          {activeTab === "courses" && (
            <CoursesTab
              courses={filteredCourses}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onAdd={handleAddCourse}
              onEdit={handleEditCourse}
              onManageQuiz={handleManageQuiz}
              onDelete={handleDeleteCourse}
            />
          )}

          {/* University Subjects Tab */}
          {activeTab === "university" && (
            <div>
              <div className="section-header">
                <div className="header-left">
                  <h2>University Subjects Management</h2>
                </div>
                <button
                  className="add-btn"
                  onClick={handleAddUniversitySubject}
                >
                  Add Subject
                </button>
              </div>

              {/* Search */}
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search university subjects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>

              {/* University Subjects Table */}
              {filteredUniversitySubjects.length > 0 ? (
                <div className="table-container">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Semester</th>
                        <th>Badge</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUniversitySubjects.map((subject) => (
                        <tr key={subject._id}>
                          <td>{subject.id}</td>
                          <td>{subject.title}</td>
                          <td>{subject.semester}</td>
                          <td>{subject.badge}</td>
                          <td>
                            <div className="action-buttons">
                              <button
                                className="edit-btn"
                                onClick={() =>
                                  handleEditUniversitySubject(subject)
                                }
                              >
                                Edit
                              </button>
                              <button
                                className="delete-btn"
                                onClick={() =>
                                  handleDeleteUniversitySubject(
                                    subject._id,
                                    subject.title,
                                  )
                                }
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="empty-state">
                  <p>No university subjects found</p>
                </div>
              )}
            </div>
          )}

          {/* Quiz Management */}
          {selectedCourseForQuiz && (
            <QuizQuestionsManager
              questions={quizzes}
              onBack={() => setSelectedCourseForQuiz(null)}
              onAdd={handleAddQuestion}
              onEdit={handleEditQuestion}
              onDelete={handleDeleteQuestion}
            />
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <div
            className="modal-overlay"
            onClick={() => {
              setShowModal(false);
              setModalType(null);
            }}
          >
            <div
              className={`modal-content ${modalType === "course" || modalType === "university" ? "modal-large" : ""}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2>
                  {modalType === "student" &&
                    (editingStudent ? "Edit Student" : "Add Student")}
                  {modalType === "course" &&
                    (editingCourse ? "Edit Course" : "Add Course")}
                  {modalType === "question" &&
                    (editingQuestion ? "Edit Question" : "Add Question")}
                  {modalType === "university" &&
                    (editingUniversitySubject
                      ? "Edit University Subject"
                      : "Add University Subject")}
                </h2>
                <button
                  className="close-btn"
                  onClick={() => {
                    setShowModal(false);
                    setModalType(null);
                  }}
                >
                  ×
                </button>
              </div>

              {/* Student Form */}
              {modalType === "student" && (
                <StudentForm
                  formData={formData}
                  setFormData={setFormData}
                  editingStudent={editingStudent}
                  onSubmit={handleSaveStudent}
                  onCancel={() => setShowModal(false)}
                />
              )}

              {/* Course Form */}
              {modalType === "course" && (
                <CourseForm
                  courseFormData={courseFormData}
                  setCourseFormData={setCourseFormData}
                  editingCourse={editingCourse}
                  onSubmit={handleSaveCourse}
                  onCancel={() => setShowModal(false)}
                />
              )}

              {/* Question Form - Normal Mode */}
              {modalType === "question" && !wizardMode && (
                <QuestionForm
                  questionFormData={questionFormData}
                  setQuestionFormData={setQuestionFormData}
                  editingQuestion={editingQuestion}
                  onSubmit={handleSaveQuestion}
                  onCancel={() => setShowModal(false)}
                />
              )}

              {/* Question Wizard (both steps) */}
              {modalType === "question" && wizardMode && (
                <QuestionWizard
                  questionFormData={questionFormData}
                  setQuestionFormData={setQuestionFormData}
                  totalQuestions={totalQuestions}
                  setTotalQuestions={setTotalQuestions}
                  currentQuestionStep={currentQuestionStep}
                  questionsToAdd={questionsToAdd}
                  wizardErrors={wizardErrors}
                  onStartWizard={handleStartWizard}
                  onNextQuestion={handleNextQuestion}
                  onCancel={handleCancelWizard}
                />
              )}

              {/* University Subject Form */}
              {modalType === "university" && (
                <form
                  onSubmit={handleSaveUniversitySubject}
                  className="student-form"
                >
                  <div className="form-row">
                    <div className="form-group">
                      <label>ID</label>
                      <input
                        type="text"
                        value={universitySubjectFormData.id}
                        onChange={(e) =>
                          setUniversitySubjectFormData({
                            ...universitySubjectFormData,
                            id: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Title</label>
                      <input
                        type="text"
                        value={universitySubjectFormData.title}
                        onChange={(e) =>
                          setUniversitySubjectFormData({
                            ...universitySubjectFormData,
                            title: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Semester</label>
                      <input
                        type="text"
                        value={universitySubjectFormData.semester}
                        onChange={(e) =>
                          setUniversitySubjectFormData({
                            ...universitySubjectFormData,
                            semester: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Badge</label>
                      <input
                        type="text"
                        value={universitySubjectFormData.badge}
                        onChange={(e) =>
                          setUniversitySubjectFormData({
                            ...universitySubjectFormData,
                            badge: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Long Description</label>
                    <textarea
                      value={universitySubjectFormData.longDescription}
                      onChange={(e) =>
                        setUniversitySubjectFormData({
                          ...universitySubjectFormData,
                          longDescription: e.target.value,
                        })
                      }
                      rows="4"
                    />
                  </div>
                  <div className="form-group">
                    <label>Prerequisites</label>
                    <input
                      type="text"
                      value={universitySubjectFormData.prerequisites}
                      onChange={(e) =>
                        setUniversitySubjectFormData({
                          ...universitySubjectFormData,
                          prerequisites: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Quiz Questions</label>
                      <input
                        type="number"
                        value={universitySubjectFormData.quiz.numQuestions}
                        onChange={(e) =>
                          setUniversitySubjectFormData({
                            ...universitySubjectFormData,
                            quiz: {
                              ...universitySubjectFormData.quiz,
                              numQuestions: parseInt(e.target.value) || 15,
                            },
                          })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label>Estimated Time</label>
                      <input
                        type="text"
                        value={universitySubjectFormData.quiz.estimatedTime}
                        onChange={(e) =>
                          setUniversitySubjectFormData({
                            ...universitySubjectFormData,
                            quiz: {
                              ...universitySubjectFormData.quiz,
                              estimatedTime: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="form-actions">
                    <button
                      type="button"
                      className="cancel-btn"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="save-btn">
                      {editingUniversitySubject ? "Update" : "Add"} Subject
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
