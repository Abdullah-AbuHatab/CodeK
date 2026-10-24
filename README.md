# CodeK — Programming Education Platform

**CodeK** is a bilingual Arabic/English programming education platform built as a six-person graduation project. It combines self-paced learning content, university materials, quizzes, an admin dashboard, and an AI tutoring assistant.

The project received a **Grade A** and was demonstrated live during the graduation-project defence.

**Live demo:** https://codek-8ha3.onrender.com

---

## Project Overview

**Project period:** Oct 2025 – Jan 2026 (graduation project, first semester 2025/2026).

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

### Server-owned prompt and hardened endpoint

The client sends only `{ message, history }`. The server owns the system prompt and builds the role-separated `messages[]` for the model, so a client cannot replace the tutor's instructions.

- History is capped (at most 20 entries accepted, the 10 most recent forwarded, 12,000 characters in total) and a message is limited to 6,000 characters
- The upstream call has a 20-second timeout (`AbortController`, `CHAT_TIMEOUT_MS`)
- The model comes from `OPENROUTER_MODEL` (default `nvidia/nemotron-3-ultra-550b-a55b:free`), with fallbacks from `OPENROUTER_FALLBACK_MODELS` sent through OpenRouter's `models` routing, so one retired model cannot break the tutor
- Upstream failures map to stable codes (`AI_TIMEOUT`, `AI_RATE_LIMITED`, `AI_UPSTREAM_ERROR`, `AI_EMPTY_RESPONSE`, `AI_NOT_CONFIGURED`); provider error text and status codes are logged on the server and never sent to the browser
- Sign-in can be required with `CHAT_REQUIRE_AUTH=true` (default `false`)

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
├── .github/workflows/
│   └── keepalive.yml      # pings /api/health/db every ~5 days
├── backend/
│   ├── data/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── scripts/           # seed.js, fixCourseIds.js, testConnection.cjs
│   ├── services/          # aiTutor.js (OpenRouter), brevo.js (e-mail)
│   ├── test/              # node:test + supertest + mongodb-memory-server
│   ├── db.js              # background connect/retry, health, 503 guard
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
├── render.yaml            # Render Blueprint
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
ADMIN_EMAIL
```

Seed the database (courses, university subjects, quizzes and the admin user from `ADMIN_*`). The command is idempotent: it inserts what is missing and never deletes anything, so it is safe to run again:

```bash
npm run seed
# reset seeded documents to the repository's values:
npm run seed -- --overwrite
# only some steps (courses, subjects, quizzes, admin):
npm run seed -- --only=quizzes
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

### 4. Tests

```bash
# backend (Node 22+; starts a throwaway in-memory MongoDB, makes no network calls)
cd backend
npm test

# frontend
cd ..
npx react-scripts test --watchAll=false
```

---

## Selected API Endpoints

### Authentication

```text
POST /api/auth/signup
POST /api/auth/login
GET  /api/auth/me
```

### Health

```text
GET /api/health      # liveness: 200 while the process is up, includes the DB state
GET /api/health/db   # deep check: real MongoDB ping, 503 when the database is unreachable
```

### AI Tutor

```text
POST /api/chat       # body: { message, history?: [{ role: "user" | "assistant", content }] }
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
- Demonstrated live at the graduation defence
- Live demo: https://codek-8ha3.onrender.com (free hosting: the first visit after 15 idle minutes takes about a minute to wake up)

---

## Repository history

Commit `ac1bb86` imports the team's final code as the baseline. Every later commit is Abdullah's own follow-up work (security fixes, refactoring, deployment and AI-tutor hardening).

The university lecture files (`public/university/`) were removed in a later commit for copyright reasons; they are still present in the history up to and including commit `2ff87ce`.

---

## Deployment

The app is a monolith: Express in `backend/` serves the API and the built React app from one URL. It runs on free tiers only.

### 1. MongoDB Atlas (Free cluster)

1. Create a project and a **Free** cluster.
2. **Database Access** → add a database user with an auto-generated password and the *Read and write to any database* role.
3. **Network Access** → add `0.0.0.0/0`. Render's outbound IP addresses are not fixed, so they cannot be allow-listed one by one; access is still protected by the database user's credentials.
4. **Connect → Drivers** → copy the `mongodb+srv://` connection string, insert the user's password and add a database name, e.g. `.../codek-platform?retryWrites=true&w=majority`.

### 2. Render (free web service)

1. **New → Blueprint** → select this repository; Render reads `render.yaml`.
2. Fill in the secret values when prompted:

| Variable | Required | Notes |
|---|---|---|
| `MONGODB_URI` | yes | Atlas connection string from step 1 |
| `JWT_SECRET` | yes | generated by Render (`generateValue`); the server refuses to start without it |
| `OPENROUTER_API_KEY` | for the AI tutor | without it `/api/chat` answers `503 AI_NOT_CONFIGURED` |
| `OPENROUTER_MODEL` | no | default `nvidia/nemotron-3-ultra-550b-a55b:free` |
| `OPENROUTER_FALLBACK_MODELS` | no | comma-separated, tried in order after the primary; default `cohere/north-mini-code:free,google/gemma-4-31b-it:free`; empty = primary only |
| `CHAT_REQUIRE_AUTH` | no | `true` = only logged-in users can use the tutor; default `false` |
| `ALLOWED_ORIGINS` | no | the service URL, e.g. `https://codek.onrender.com` (only matters for cross-origin clients) |
| `BREVO_API_KEY`, `BREVO_SENDER_EMAIL`, `CONTACT_RECIPIENT_EMAIL` | no | contact-form e-mail; messages are saved even without them |
| `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `ADMIN_EMAIL`, `ADMIN_FULLNAME` | no | read only by the seed script, not by the server |

`NODE_ENV`, `NODE_VERSION`, `PORT`, `GENERATE_SOURCEMAP` and the rate-limit values are already set in the Blueprint.

### 3. Seed the database

Render's free plan has no shell, so seed from your machine once the cluster exists. Put `MONGODB_URI` and the `ADMIN_*` values (password of 12+ characters) in `backend/.env`, then:

```bash
cd backend
npm ci
npm run seed
```

### 4. Keep-alive

Atlas pauses a Free cluster after 30 days without connections, and the Render free service sleeps after 15 minutes idle, so a quiet site would eventually lose its database. `.github/workflows/keepalive.yml` calls `/api/health/db` every ~5 days, which wakes the service and makes it run a real ping against Atlas.

1. **Settings → Secrets and variables → Actions → Variables** → add the repository variable `APP_URL` = `https://<service-name>.onrender.com`.
2. **Actions → Keep-alive → Run workflow** once to check it.

GitHub disables scheduled workflows in public repositories after 60 days without repository activity. If that happens, re-enable it from **Actions → Keep-alive → Enable workflow** or with `gh workflow enable keepalive.yml`. Atlas also e-mails a warning seven days before it pauses a cluster.

### Cold starts

After 15 idle minutes Render stops the free service; the next visitor waits about a minute while it starts. The server answers `/api/health` as soon as it is listening and connects to MongoDB in the background (retrying with backoff), so the React app loads even while the database is unreachable; API routes that need the database answer `503 DB_UNAVAILABLE` until the connection is up.

---

## Known limitations

- Free-tier cold start: the first request after 15 idle minutes takes about a minute.
- The public university-subject pages read `src/data/universitySubjectsData.js` in the browser, not the database, so admin edits to subjects do not change them.
- The university lecture files (slides and PDFs, about 130 MB in `public/university/`) were removed for copyright reasons: they are the course instructors' material. They remain in the older git history. Subject pages list the chapters and show "Course materials are available to enrolled students" instead of View/Download buttons.
- Two quiz questions need a content fix and were left unchanged:
  - `Wireless-Networks` #14 is an ordering question whose options are single items, so none of them matches the stored answer and it can never be graded correct.
  - `Numerical-Analysis` #14 (bisection on [4, 11], tolerance 10⁻³) expects "e. 14", while the usual bound n ≥ log2(7 / 10⁻³) ≈ 12.8 gives 13.
- The default AI models are OpenRouter `:free` models, which have per-minute and daily request limits; when they are exhausted the tutor answers `AI_RATE_LIMITED` until the limit resets.
- There is no CI workflow for the tests yet; run them locally before pushing.
- JWTs are valid for 7 days and cannot be revoked before they expire.

---

## License

License not yet declared.
