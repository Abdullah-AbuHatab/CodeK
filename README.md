# CodeK — Programming Education Platform

**CodeK** is a bilingual Arabic/English programming education platform built as a six-person graduation project. It combines self-paced learning content, university materials, quizzes, an admin dashboard, and an AI tutoring assistant.

The project received a **Grade A** and was demonstrated live during the graduation-project defence.

---

## Project Overview

CodeK helps students learn programming through:

- Web Development, AI, and Cyber Security learning tracks
- University subject materials
- Interactive quizzes
- Student and admin dashboards
- AI-generated hints and learning guidance
- Arabic/English support
- JWT-based authentication and protected routes

---

## My Contribution — AI Tutor Assistant

My main responsibility in the project was building the **AI tutoring assistant**.

I implemented the AI feature across both backend and frontend:

- Built an Express endpoint that communicates with **OpenRouter**
- Integrated the tutor into the React frontend as a floating chat widget
- Added rolling conversation context using recent messages
- Matched the assistant response language to the user automatically
- Designed the tutor to provide **hints instead of direct answers**
- Disabled the floating assistant automatically during active quizzes to reduce misuse
- Kept the AI provider key server-side
- Added a dedicated rate limiter for the AI endpoint
- Added input validation for AI requests

I also contributed to additional UI and platform features outside the AI module.

---

## AI Design Decisions

### Hint-first behaviour

The AI tutor is intentionally designed to guide students instead of simply giving them answers.

During quiz-related interactions, the assistant is instructed to provide hints and explanations rather than direct answers.

### Quiz protection

The floating AI assistant reads quiz state from the React context and automatically closes when a quiz begins.

This keeps the tutoring feature available while browsing the platform but prevents it from being used as an answer source during an active quiz.

### Server-side provider key

The OpenRouter key stays on the backend.

The frontend sends requests only to:

```text
POST /api/chat
```

The backend handles the provider request, which avoids exposing the API key in the browser.

### Dedicated rate limiting

AI requests use their own limiter, separate from the platform's general API and authentication limits.

### Conversation context

The assistant sends recent messages as context so replies remain relevant to the ongoing conversation instead of treating every message as isolated.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, React Router, MUI |
| Backend | Node.js, Express |
| Database | MongoDB Atlas, Mongoose |
| Authentication | JWT, bcryptjs |
| AI | OpenRouter |
| Validation | express-validator |
| Security | Helmet, CORS allowlist, rate limiting |

---

## Core Features

### Learning Platform

- Programming-learning tracks
- University subject materials
- Course catalog
- Student dashboard
- Admin dashboard
- Arabic/English experience

### Quiz System

- Randomized quiz attempts
- AI-generated hints
- Attempt results
- Performance analysis
- Personalized learning guidance

### Authentication & Roles

- Student registration and login
- Admin account
- JWT-based authentication
- Protected routes
- Student/admin role separation

### Admin Dashboard

Admins can manage:

- Students
- Courses
- University subjects
- Quiz questions

---

## Security

The application includes several defensive measures:

- JWT authentication
- Password hashing with bcrypt
- Helmet security headers
- CORS allowlist
- Rate limiting for authentication, AI, and general API traffic
- Input validation with `express-validator`
- Server-side storage of AI provider credentials
- Protected frontend routes validated against the backend

---

## Project Structure

```text
CodeK/
├── backend/
│   ├── data/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seedAdmin.js
│   ├── seedData.js
│   └── server.js
├── public/
├── src/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── services/
│   └── App.js
├── .env.example
├── package.json
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas
- OpenRouter API key

### 1. Clone

```bash
git clone https://github.com/Abdullah-AbuHatab/CodeK.git
cd CodeK
```

### 2. Backend

```bash
cd backend
npm install
cp .env.example .env
```

Configure the required environment variables, including:

```text
MONGODB_URI
JWT_SECRET
OPENROUTER_API_KEY
ADMIN_USERNAME
ADMIN_PASSWORD
```

Seed the project data if needed:

```bash
node seedAdmin.js
node seedData.js
```

Start the backend:

```bash
npm run dev
```

or:

```bash
npm start
```

The API runs on:

```text
http://localhost:5000
```

### 3. Frontend

From the project root:

```bash
npm install
cp .env.example .env
npm start
```

The frontend runs on:

```text
http://localhost:3000
```

---

## Selected API Endpoints

### Authentication

```text
POST /api/auth/signup
POST /api/auth/login
GET  /api/auth/me
```

### AI Tutor

```text
POST /api/chat
```

### Courses & Content

```text
GET /api/courses/public/all
GET /api/quizzes/:courseId
POST /api/quiz/submit
```

### Admin Operations

```text
GET/POST/PUT/DELETE /api/courses
GET/POST/PUT/DELETE /api/university-subjects
GET/POST/PUT/DELETE /api/courses/:courseId/questions
GET/POST/PUT/DELETE /api/students
```

---

## Team

CodeK was developed by a team of six students.

| Member | Main Contribution |
|---|---|
| Mohammed Ibdah | Team Leader & Frontend Architecture |
| Mahmoud Al-Mahasneh | UI/UX & Creative Development |
| Mark Haddad | System Logic & Backend Development |
| Abdullah Abu Hatab | AI Tutor Assistant & AI Integration |
| Omar Ashraf | React State & Hooks |
| Khaled Dhdoli | Input Security & Validation |

---

## Graduation Project

- Team size: **6**
- Project type: **Web application**
- Languages: **Arabic / English**
- Grade: **A**
- Live demo: **Completed successfully**

---

## License

License not yet declared.
