# RFID Attendance System - Frontend

A React + Vite + Tailwind CSS frontend interface for an RFID-based Smart Attendance System.

This project is currently powered by a mock service layer and dummy data, completely decoupled and pre-configured for seamless backend integration (Node.js/Express + Firebase).

---

## 🚀 How to Run the Project

1. Navigate into the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

4. Open the displayed local URL in your browser (typically `http://localhost:5173`).

---

## 📂 Where Dummy Data Lives

All dummy fixtures are organized in `src/data/`:
- `src/data/dummyUsers.js` — Seeded accounts for Student, Teacher, and Admin login.
- `src/data/dummyStudents.js` — Student records with RFID Card UIDs, department, semester, and section.
- `src/data/dummyTeachers.js` — Faculty profiles and course assignments.
- `src/data/dummyAttendance.js` — Historical attendance punch logs across dates and statuses (`Present`, `Late`, `Absent`).

### Pre-configured Test Accounts
- **Student**: ID `20230204064` | Password `1234`
- **Teacher**: ID `T-101` | Password `1234`
- **Admin**: ID `admin` | Password `admin`

---

## 🔌 How to Swap Dummy Services for the Real API

All communication is strictly encapsulated inside `src/services/`. **No component imports dummy data or calls endpoints directly.**

To connect to your live backend:

1. **Configure API Base URL**:
   In `frontend/.env` (or copy from `.env.example`):
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

2. **Pre-configured Axios Client (`src/services/api.js`)**:
   `api.js` is already set up to read `VITE_API_URL` and automatically attaches the `Bearer <token>` from `localStorage` on all outgoing requests.

3. **Swap Service Internals**:
   In each service file inside `src/services/`, clear out the `new Promise(...)` dummy blocks and uncomment the marked `// TODO:` statements.
   
   Example in `src/services/studentService.js`:
   ```javascript
   // Change from:
   getMyAttendance: async (studentId) => {
     return new Promise((resolve) => {
       resolve(dummyAttendance.filter(a => a.studentId === studentId));
     });
   }

   // To:
   getMyAttendance: async (studentId) => {
     const res = await api.get(`/student/${studentId}/attendance`);
     return res.data;
   }
   ```
   No UI page or component code needs to be altered.
