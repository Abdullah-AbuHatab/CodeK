export const courses = [
  { id: "math", title: "Math", quizzesCount: 2 },
  { id: "physics", title: "Physics", quizzesCount: 1 },
];

export const students = [
  {
    id: 1,
    name: "Ahmad",
    enrolledCourses: ["math", "physics"],
    quizzes: [
      { courseId: "math", score: 80 },
      { courseId: "physics", score: 70 },
    ],
  },
  {
    id: 2,
    name: "Sara",
    enrolledCourses: ["math"],
    quizzes: [{ courseId: "math", score: 95 }],
  },
];
