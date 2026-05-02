// src/components/pages/coursesData.js
export const COURSES = [
  {
    id: "web-101",
    title: "Web Development 101",
    category: "Web",
    level: "Beginner",
    duration: "4 weeks",
    badge: "HTML • CSS • Basics",
    shortDescription:
      "Start from zero and learn how to build simple static web pages using HTML and CSS.",
    longDescription:
      "This path is perfect if you are just starting out. You will learn how the web works, how to structure a page using HTML, and how to style it with CSS. By the end, you will build a simple landing page that you can show to others.",
    topics: ["HTML structure", "Basic CSS", "Simple landing page"],
    objectives: [
      "Understand how browsers render web pages",
      "Write clean HTML structure",
      "Use basic CSS to control layout and colors",
    ],
    prerequisites: "No prior experience needed. Just curiosity and time.",
    prerequisitesShort: "No prior knowledge required.",
    assessment: {
      numQuestions: 10,
      estimatedTime: "15–20 min",
      analysis: true,
      aiRecommendations: true,
    },
    assessmentInstructions:
      "Answer 10 questions. You will get a score plus personalized AI feedback after completion.",
  },
  {
    id: "modern-js",
    title: "Modern JavaScript",
    category: "Web",
    level: "Intermediate",
    duration: "5 weeks",
    badge: "ES6 • DOM • APIs",
    shortDescription:
      "Upgrade your JavaScript skills and learn how to interact with the DOM and external APIs.",
    longDescription:
      "In this course you move from basic JS knowledge to writing real, interactive logic. You will work with modern ES6 syntax, manipulate the DOM, and fetch data from public APIs to build small interactive apps.",
    topics: ["ES6 features", "DOM manipulation", "Fetch API"],
    objectives: [
      "Write modern ES6+ JavaScript",
      "Handle events and update the DOM",
      "Fetch and display data from APIs",
    ],
    prerequisites: "Basic understanding of variables, loops and functions.",
    prerequisitesShort: "Basic JS knowledge required.",
    assessment: {
      numQuestions: 12,
      estimatedTime: "20–25 min",
      analysis: true,
      aiRecommendations: true,
    },
    assessmentInstructions:
      "Answer 12 questions. Receive a score and personalized AI-based recommendations.",
  },
  {
    id: "react-fundamentals",
    title: "React Fundamentals",
    category: "Web",
    level: "Intermediate",
    duration: "6 weeks",
    badge: "Components • Hooks",
    shortDescription:
      "Learn the core ideas of React and how to build reusable components and simple apps.",
    longDescription:
      "You will learn how to think in components, manage state with hooks, and handle routing. By the end, you will build a small multi-page app using React Router.",
    topics: ["Components & props", "State & hooks", "Basic routing"],
    objectives: [
      "Build UI using React components",
      "Manage state using hooks like useState and useEffect",
      "Navigate between pages using React Router",
    ],
    prerequisites: "Comfortable with JavaScript and basic web concepts.",
    prerequisitesShort: "Intermediate JS knowledge recommended.",
    assessment: {
      numQuestions: 15,
      estimatedTime: "25–30 min",
      analysis: true,
      aiRecommendations: true,
    },
    assessmentInstructions:
      "Answer 15 questions to assess your React fundamentals. Receive AI-driven guidance after completion.",
  },
  {
    id: "ai-basics",
    title: "AI Basics",
    category: "AI",
    level: "Beginner",
    duration: "3 weeks",
    badge: "ML • Core concepts",
    shortDescription:
      "A friendly introduction to Artificial Intelligence and basic Machine Learning ideas.",
    longDescription:
      "This course explains what AI really is, how machine learning models learn from data, and where these technologies are used in real life. The goal is to give you intuition, not heavy math.",
    topics: [
      "What is AI?",
      "Supervised vs unsupervised learning",
      "Real-world examples",
    ],
    objectives: [
      "Understand the basic vocabulary of AI and ML",
      "Recognize common types of ML problems",
      "Know where AI is used in real products",
    ],
    prerequisites: "Curiosity. No math or coding background required.",
    prerequisitesShort: "No prior knowledge required.",
    assessment: {
      numQuestions: 10,
      estimatedTime: "15 min",
      analysis: true,
      aiRecommendations: true,
    },
    assessmentInstructions:
      "Answer 10 questions to gauge your AI understanding and get personalized recommendations.",
  },
  {
    id: "ml-intro",
    title: "Intro to Machine Learning",
    category: "AI",
    level: "Advanced",
    duration: "6 weeks",
    badge: "Models • Training",
    shortDescription:
      "Go deeper into machine learning by training simple models on real datasets.",
    longDescription:
      "You will work with datasets, split them, train models, and evaluate them. The focus is on intuition and practical experiments rather than pure theory.",
    topics: ["Datasets", "Training models", "Evaluation metrics"],
    objectives: [
      "Load and explore simple datasets",
      "Train basic ML models",
      "Interpret evaluation metrics like accuracy",
    ],
    prerequisites:
      "Basic Python and math comfort (high-school algebra is enough).",
    prerequisitesShort: "Python and basic math required.",
    assessment: {
      numQuestions: 15,
      estimatedTime: "25–30 min",
      analysis: true,
      aiRecommendations: true,
    },
    assessmentInstructions:
      "Answer 15 questions to assess your ML understanding with personalized AI feedback.",
  },
  {
    id: "cyber-fundamentals",
    title: "Cyber Security",
    category: "Cyber",
    level: "Beginner",
    duration: "4 weeks",
    badge: "Networking • Attacks",
    shortDescription:
      "Learn the core ideas of cyber security and how to protect systems from common attacks.",
    longDescription:
      "This course gives you a foundation in networking, common attack types, and best practices to stay safe online. It is great for anyone curious about security.",
    topics: ["Basic networking", "Common attacks", "Safe practices"],
    objectives: [
      "Understand basic networking concepts",
      "Recognize common cyber attacks",
      "Apply simple best practices to stay secure",
    ],
    prerequisites:
      "General computer knowledge. No deep technical background needed.",
    prerequisitesShort: "No prior knowledge required.",
    assessment: {
      numQuestions: 10,
      estimatedTime: "15–20 min",
      analysis: true,
      aiRecommendations: true,
    },
    assessmentInstructions:
      "Answer 10 questions to test your Cyber Security basics and receive AI feedback.",
  },
  {
    id: "university",
    title: "مواد الجامعة",
    category: "University",
    level: "All",
    duration: "حسب الخطة",
    badge: "CS • IT",
    shortDescription: "كل مواد الجامعة في مكان واحد",
    isUniversity: true,
  },
];
