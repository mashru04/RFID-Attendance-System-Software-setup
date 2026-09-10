# 🎫 RFID-Based Smart Attendance System — Frontend

A modern web dashboard for an RFID-based attendance system, built for a Microprocessor & Microcontroller course project. Students punch an RFID card on a hardware device, and this software layer records, monitors, and visualizes attendance across three roles: **Student**, **Teacher**, and **Admin** — plus a public **Live Dashboard** for big-screen display.

> **Note:** This repository currently contains the **frontend only**. It runs fully on dummy data through a clean service layer, so the backend and database can be plugged in later without touching the UI.

---

## 📌 Table of Contents
- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Architecture & Data Flow](#-architecture--data-flow)
- [Getting Started](#-getting-started)
- [Test Accounts](#-test-accounts)
- [Connecting the Real Backend](#-connecting-the-real-backend-later)
- [Roadmap](#-roadmap)
- [Team](#-team)

---

## 🔎 Overview

In a physical setup, a student taps an RFID card on an ESP-based reader. That punch (who, when, which device) is stored in a database. This frontend is the **software dashboard** that turns those punches into something usable:

- Students see their own attendance, punch times, and late/absent record.
- Teachers see who was present, late, or absent in their classes.
- Admins manage students, teachers, RFID cards, and view all records.
- A public Live Dashboard shows real-time punches and stats on a big screen.

The **hardware, backend, and database are handled by other team members.** This repo is the frontend, deliberately built so their work connects in with minimal friction.

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React (Vite) |
| Routing | React Router DOM v6 |
| Styling | Tailwind CSS |
| Icons | lucide-react |
| Charts | Recharts |
| Animations | GSAP |
| UI Accents | React Bits (LineSidebar, PillNav, Counter, ProfileCard) |
| Auth State | React Context API |
| HTTP Client | Axios (configured, ready for backend) |
| Data (current) | Dummy data via a service layer |

---

## ✨ Features

### 🔐 Authentication & Roles
- Role selection screen (Student / Teacher / Admin)
- Separate login & registration for students and teachers
- Seeded admin login (no public registration)
- Role-based protected routes — no user can access another role's pages
- Session persistence via localStorage (refresh keeps you logged in)

> Login uses **ID/email + password**. The RFID card is only for attendance punching, never for login.

### 👨‍🎓 Student Panel
- Personal dashboard: today's status, attendance %, present/late/absent counts
- Full attendance history with punch times and colored status
- Profile view with department and RFID card details

### 👨‍🏫 Teacher Panel
- Dashboard overview of assigned classes
- Class attendance by date (present / late / absent)
- Student list for assigned classes

### 🛡 Admin Panel
- System overview: total students, teachers, today's attendance
- Manage Students (add / edit / delete, with ID validation & duplicate checks)
- Manage Teachers (add / edit / delete, approve toggle)
- RFID card ↔ student mapping
- All attendance records with date & status filters

### 📡 Live Dashboard (public, big-screen ready)
- Animated stat counters (Present / Late / Absent / Total)
- Charts (donut + bar) built with Recharts
- Live punch feed with a pulsing "live" indicator
- Auto-refreshing feed via polling

### 🎨 UI / UX
- "Stormy morning" blue-gray palette with consistent status colors
- Glassmorphism cards, custom background, smooth micro-interactions
- Responsive layout, reusable components, loading & empty states

---

## 📁 Project Structure

Rfid Attendance system/
│
├── frontend/ # 👉 The React frontend (this repo's main work)
│ ├── public/
│ ├── src/
│ │ ├── assets/ # images (background, hero, etc.)
│ │ ├── components/ # reusable UI (Card, Table, StatusBadge, Loader...)
│ │ │ └── react-bits/ # LineSidebar, PillNav, Counter, ProfileCard
│ │ ├── context/ # AuthContext (who is logged in + role)
│ │ ├── data/ # dummy data (students, teachers, attendance, users)
│ │ ├── hooks/ # useAuth
│ │ ├── layouts/ # StudentLayout, TeacherLayout, AdminLayout
│ │ ├── pages/
│ │ │ ├── auth/ # RoleSelect, logins, registers
│ │ │ ├── student/ # dashboard, attendance, profile
│ │ │ ├── teacher/ # dashboard, class attendance, student list
│ │ │ ├── admin/ # dashboard, manage students/teachers/cards, all attendance
│ │ │ ├── common/ # NotFound, Unauthorized
│ │ │ └── LiveDashboard.jsx # public live feed
│ │ ├── routes/ # AppRoutes, ProtectedRoute
│ │ ├── services/ # ⭐ all data access lives here (swap point for backend)
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── .env.example
│ └── package.json
│
├── backend/ # (handled by the backend team — Node.js + Express)
│
└── README.md


---

## 🔗 Architecture & Data Flow

The frontend never talks to the database directly. Everything goes through one layer:

UI Pages / Components
│ (call service functions only)
▼
services/ ⭐ ← the single swap point
│
├── NOW: returns dummy data from src/data/
└── LATER: calls the real backend API (Node.js + Express → Firebase)


**Why this matters:** pages and components don't know or care where data comes from. When the backend is ready, only the `services/` folder changes — no page, component, or route needs to be rewritten. Every service function is already async and marked with a `// TODO` where the real API call will go.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or newer recommended)
- npm

### Installation & Run

```bash
# 1. Clone the repository
git clone https://github.com/mashru04/RFID-Attendance-System-Software-setup.git

# 2. Go into the frontend folder
cd "RFID-Attendance-System-Software-setup/frontend"

# 3. Install dependencies
npm install

# 4. Start the dev server
npm run dev
```

Then open the local URL shown in the terminal (usually `http://localhost:5173`).

### Environment

Copy `.env.example` to `.env`. It contains the future backend URL:

VITE_API_URL=http://localhost:5000/api


This is used by the pre-configured Axios instance but stays inactive while the app runs on dummy data.

---

## 🔑 Test Accounts

Use these to explore each role (dummy credentials):

| Role | ID | Password |
|------|-----|----------|
| Student | `20230204064` | `1234` |
| Teacher | `T-101` | `1234` |
| Admin | `admin` | `admin` |

> ⚠️ Any data you add (new students, etc.) lives in memory only and resets on refresh — this is expected until the backend/database is connected.

---

## 🔌 Connecting the Real Backend (Later)

When the backend team is ready:

1. Set `VITE_API_URL` in `.env` to the live backend URL.
2. In each file under `src/services/`, replace the dummy return with the real API call (each spot is already marked with a `// TODO`). Example:

```javascript
// Before (dummy)
export async function getMyAttendance() {
  return dummyAttendance;
}

// After (real backend)
export async function getMyAttendance() {
  const res = await api.get('/student/attendance');
  return res.data;
}
```

That's it — the rest of the app keeps working unchanged.

**Data contract** the backend should follow:

User { id, name, role, department, cardId?, email? }
AttendanceRecord{ id, studentId, studentName, date, punchTime, status, courseId, deviceId }
Student { id, name, department, semester, section, cardId, email }
Teacher { id, name, department, email, assignedCourses[] }


`status` is one of: `"Present"`, `"Late"`, `"Absent"` — and should be **calculated by the backend**, not the frontend.

---

## 🗺 Roadmap

- [x] Full frontend with three role panels + live dashboard
- [x] Dummy service layer ready for backend swap
- [x] Polished UI (charts, animations, custom theme)
- [ ] Backend (Node.js + Express)
- [ ] Firebase database integration
- [ ] ESP32 hardware → database punch pipeline
- [ ] Real-time sync across all panels
- [ ] Reports export (CSV / PDF)

---

## 👥 Team

- **Frontend:** [Mashruba Islam]
- **Backend & Database:** [teammate names]
- **Hardware:** [teammate names]

*Course: CSE 3118 — Microprocessors and Microcontrollers Lab, AUST*

---
