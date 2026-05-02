# CodeK — Learn. Explore. Build.

A coding-education platform with hands-on courses in **Web Development**, **AI**, and
**Cyber Security**, plus AI-powered quizzes, hints, and personalized
learning roadmaps. Includes a public catalog, a student dashboard, an
admin console, and a built-in tutor chatbot.

> Built as a graduation project. Frontend in React 19; backend in Express +
> MongoDB; AI features powered by OpenRouter.

---

## ✨ Features

- **Course catalog** for Web Dev, AI, and Cyber Security tracks (Beginner →
  Advanced) plus 12 university subjects with downloadable chapter files.
- **AI tutor chatbot** that students can ping any time outside the quiz.
- **Quiz system** that picks 10 random questions per attempt, with:
  - Live AI hints per question (no spoilers).
  - End-of-quiz performance analysis: strengths, weaknesses, and a
    personalized 3–5 step learning roadmap.
- **Auth** with JWT — separate `student` and `admin` roles.
- **Admin dashboard** for CRUD over students, courses, university
  subjects, and quiz questions.
- **AI hints generated on demand** — no static hint data baked into the
  bundle, so they're fresh every time.

---

## 🛠️ Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 19 (Create React App), React Router 7, MUI 7, AOS, EmailJS |
| Backend | Node.js, Express 4, Mongoose 8 |
| Database | MongoDB Atlas |
| Auth | JWT + bcryptjs |
| AI | OpenRouter (`gpt-3.5-turbo` by default) |
| Security | Helmet, CORS allowlist, express-rate-limit, express-validator |

---

## 📂 Project Structure

```
.
├── backend/
│   ├── data/quizData.js        # Question pool (seed-only, NOT shipped to browser)
│   ├── middleware/validators.js
│   ├── models/                 # Course, Quiz, UniversitySubject (Mongoose)
│   ├── routes/quizRoutes.js
│   ├── seedAdmin.js            # Create / reset the admin user
│   ├── seedData.js             # Seed courses + subjects + quizzes
│   ├── seedQuizzes.js          # Seed quizzes only
│   ├── server.js               # Express app + every API route
│   ├── .env.example
│   └── package.json
├── public/
│   ├── index.html              # SEO + Open Graph + Twitter cards
│   ├── manifest.json           # PWA manifest
│   ├── og-image.png            # Social-share banner
│   ├── favicon.ico, logo*.png  # Brand icons
│   └── university/             # Chapter PDFs / PPTs
├── src/
│   ├── App.js                  # Routes + lazy-loaded pages
│   ├── config.js               # API_URL from env
│   ├── components/
│   │   ├── FloatingChatBot.*   # AI tutor chatbot
│   │   ├── common/
│   │   │   ├── ErrorBoundary.js
│   │   │   ├── PrivateRoute.js # Verifies JWT against /api/auth/me
│   │   │   └── ScrollToTop.js
│   │   └── layout/             # Header, Footer
│   ├── context/QuizContext.js  # Hides the chatbot during quizzes
│   ├── data/                   # Course + university metadata (small, kept on the client)
│   ├── pages/                  # Home, About, Courses, Quiz, Auth/*, etc.
│   └── services/               # authService, quizService, adminCourseService
├── .env.example                # Frontend env template
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm.
- A MongoDB Atlas cluster (free tier is fine).
- An OpenRouter API key — sign up at <https://openrouter.ai>.

### 1. Clone

```bash
git clone <repo-url>
cd "zero AI finall project"
```

### 2. Backend

```bash
cd backend
npm install
cp .env.example .env
# then edit backend/.env and fill in MONGODB_URI, JWT_SECRET, OPENROUTER_API_KEY,
# ADMIN_USERNAME, ADMIN_PASSWORD, etc.
```

**Seed the database** (run once):

```bash
node seedAdmin.js     # creates the initial admin user from .env
node seedData.js      # populates courses, university subjects, quizzes
```

**Start the API:**

```bash
npm run dev           # nodemon
# or
npm start             # plain node
```

Server runs on `http://localhost:5000`.

### 3. Frontend

```bash
cd ..
npm install
cp .env.example .env
# .env defaults already point to http://localhost:5000/api — leave as-is for local dev
npm start
```

App runs on `http://localhost:3000`.

---

## 🔧 Environment Variables

### Backend (`backend/.env`)

| Var | Purpose |
|---|---|
| `MONGODB_URI` | Atlas connection string |
| `JWT_SECRET` | 64+ char random hex; used to sign tokens |
| `PORT` | Default `5000` |
| `NODE_ENV` | `development` / `production` |
| `OPENROUTER_API_KEY` | API key for the AI features |
| `ALLOWED_ORIGINS` | Comma-separated CORS allowlist |
| `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `ADMIN_FULLNAME`, `ADMIN_EMAIL` | Used by `seedAdmin.js` |
| `RATE_LIMIT_AUTH_*`, `RATE_LIMIT_AI_*`, `RATE_LIMIT_API_*` | Optional rate-limit tuning |

Generate a strong `JWT_SECRET` with:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Frontend (`.env`)

| Var | Purpose |
|---|---|
| `REACT_APP_API_URL` | Backend base URL. Default: `http://localhost:5000/api` |

---

## 📜 Available Scripts

### Frontend (root)

| Command | What it does |
|---|---|
| `npm start` | Dev server with hot reload (port 3000) |
| `npm run build` | Production build into `build/` |
| `npm test` | Jest test runner |

### Backend (`backend/`)

| Command | What it does |
|---|---|
| `npm run dev` | nodemon — auto-restart on file changes |
| `npm start` | plain `node server.js` |
| `node seedAdmin.js` | Create / reset the admin user |
| `node seedData.js` | Wipe and reseed all course / subject / quiz data |
| `node seedQuizzes.js` | Reseed only the quizzes |
| `node testConnection.cjs` | Quick MongoDB connectivity check |

---

## 🔐 Authentication & Roles

- **Students** sign up via `/signup`, log in via `/login`, and land on
  `/student`. They can take quizzes; results are saved against their user
  record.
- **The admin** is created from `seedAdmin.js` with credentials taken from
  `.env`. There is **no hardcoded backdoor**. Admin uses the same
  `/login` flow and is routed to `/admin` based on the `role` field.
- `PrivateRoute` calls `GET /api/auth/me` on entry to confirm the JWT is
  still valid, with a 60s `sessionStorage` cache to keep navigation fast.
  Expired or revoked tokens result in a clean redirect to `/login`.

---

## 🤖 AI Integration

All AI calls go through **`POST /api/chat`** on the backend, which
forwards the prompt to OpenRouter. Three places use it:

1. `FloatingChatBot` — open-ended Q&A while browsing the site.
2. `Quiz` "AI Hint" button — short Socratic hint per question, never the
   answer.
3. `Quiz` end-of-attempt analysis — strengths, weaknesses, and a
   personalized 3–5 step learning roadmap based on the actual answer
   review.

Hints are generated on demand — there is **no static `hint` field** on
quiz questions, so each request produces a fresh, contextual hint.

---

## 📡 API Reference (high level)

| Method | Path | Auth | Notes |
|---|---|---|---|
| `POST` | `/api/auth/signup` | — | Public, rate-limited (5 / 15 min) |
| `POST` | `/api/auth/login` | — | Public, rate-limited |
| `GET` | `/api/auth/me` | JWT | Used by `PrivateRoute` |
| `POST` | `/api/chat` | — | AI tutor, rate-limited (30 / min) |
| `GET` | `/api/courses/public/all` | — | Public catalog |
| `GET` | `/api/quizzes/:courseId` | — | Question pool for a course |
| `POST` | `/api/quiz/submit` | JWT (student) | Save a quiz attempt |
| `GET/POST/PUT/DELETE` | `/api/courses` | JWT (admin) | Course CRUD (accepts slug or `_id`) |
| `GET/POST/PUT/DELETE` | `/api/university-subjects` | JWT (admin) | University subject CRUD |
| `GET/POST/PUT/DELETE` | `/api/courses/:courseId/questions` | JWT (admin) | Per-course questions |
| `GET/POST/PUT/DELETE` | `/api/students` | JWT (admin) | Student CRUD |
| `GET` | `/api/admin/students`, `/api/admin/stats` | JWT (admin) | Dashboard helpers |

Generic `/api` traffic is capped at 300 req / 15 min per IP.

---

## 🛡️ Security

- **No hardcoded credentials.** Admin is in the database, hashed with
  bcrypt; `seedAdmin.js` creates / resets it from `.env`.
- **Rate limiting** on auth endpoints (5 / 15 min), AI endpoint
  (30 / min), and a generic `/api/*` ceiling (300 / 15 min).
- **CORS allowlist** via `ALLOWED_ORIGINS`. Requests from origins not on
  the list get no CORS headers, so the browser blocks them.
- **Input validation** with `express-validator` on every mutating
  endpoint — the custom `isPlainString` check rejects MongoDB operator
  objects, neutralizing trivial NoSQL-injection payloads.
- **`helmet()`** for the standard security header set (HSTS, X-Frame-
  Options, X-Content-Type-Options, etc.) and a 100 KB cap on JSON
  bodies. `X-Powered-By` is suppressed.
- **JWT** signed with a long random secret (`JWT_SECRET`). Tokens expire
  after 7 days.
- **PrivateRoute** verifies tokens against the backend, not just
  localStorage, so a tampered local user object can't render protected
  pages.

---

## 👥 Team

| Member | Role |
|---|---|
| Mohammed Ibdah | Team Leader & Frontend Architect |
| Mahmoud Al-Mahasneh | UI/UX Designer & Creative Dev |
| Mark Haddad | System Logic & Backend Dev |
| Abdullah Abu-hatab | Data Structure & Content Lead |
| Omar Ashraf | React State & Hooks Specialist |
| Khaled Dhdoli | Input Security & Validation |

---

## 📄 License

License not yet declared. Pick one (MIT is a sensible default for a
graduation project) and update this section.
