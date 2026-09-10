import { dummyStudents } from "../data/dummyStudents";
import { dummyTeachers } from "../data/dummyTeachers";
import { dummyAttendance } from "../data/dummyAttendance";
// import api from "./api"; // TODO: uncomment when backend is ready

export const adminService = {
  getAdminStats: async () => {
    // TODO: replace with: const res = await api.get('/admin/stats'); return res.data;
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockToday = "2023-10-27";
        const todayAttendance = dummyAttendance.filter(a => a.date === mockToday);
        const presentCount = todayAttendance.filter(a => a.status === "Present").length;

        resolve({
          totalStudents: dummyStudents.length,
          totalTeachers: dummyTeachers.length,
          todayPresent: presentCount,
          todayTotalPunches: todayAttendance.length
        });
      }, 300);
    });
  },

  getStudents: async () => {
    // TODO: replace with: const res = await api.get('/admin/students'); return res.data;
    return new Promise(resolve => setTimeout(() => resolve([...dummyStudents]), 300));
  },
  addStudent: async (student) => {
    // TODO: replace with: const res = await api.post('/admin/students', student); return res.data;
    // FIX: use the ID typed in the form, do NOT auto-generate with Date.now()
    return new Promise(resolve => setTimeout(() => resolve({ ...student }), 300));
  },
  updateStudent: async (id, data) => {
    // TODO: replace with: const res = await api.put(`/admin/students/${id}`, data); return res.data;
    return new Promise(resolve => setTimeout(() => resolve({ id, ...data }), 300));
  },
  deleteStudent: async (id) => {
    // TODO: replace with: await api.delete(`/admin/students/${id}`);
    return new Promise(resolve => setTimeout(() => resolve({ success: true }), 300));
  },

  getTeachers: async () => {
    // TODO: replace with: const res = await api.get('/admin/teachers'); return res.data;
    return new Promise(resolve => setTimeout(() => resolve([...dummyTeachers]), 300));
  },
  addTeacher: async (teacher) => {
    // TODO: replace with: const res = await api.post('/admin/teachers', teacher); return res.data;
    // FIX: use the ID typed in the form, do NOT auto-generate with Date.now()
    return new Promise(resolve => setTimeout(() => resolve({ ...teacher }), 300));
  },
  updateTeacher: async (id, data) => {
    // TODO: replace with: const res = await api.put(`/admin/teachers/${id}`, data); return res.data;
    return new Promise(resolve => setTimeout(() => resolve({ id, ...data }), 300));
  },
  deleteTeacher: async (id) => {
    // TODO: replace with: await api.delete(`/admin/teachers/${id}`);
    return new Promise(resolve => setTimeout(() => resolve({ success: true }), 300));
  },

  getCards: async () => {
    // TODO: replace with: const res = await api.get('/admin/cards'); return res.data;
    return new Promise(resolve => {
      setTimeout(() => {
        const cards = dummyStudents.filter(s => s.cardId).map(s => ({
          cardId: s.cardId,
          studentId: s.id,
          studentName: s.name
        }));
        resolve(cards);
      }, 300);
    });
  },

  getAllAttendance: async (filters = {}) => {
    // TODO: replace with: const res = await api.get('/admin/attendance', { params: filters }); return res.data;
    return new Promise(resolve => {
      setTimeout(() => {
        let records = [...dummyAttendance];
        if (filters.date) {
          records = records.filter(r => r.date === filters.date);
        }
        if (filters.status) {
          records = records.filter(r => r.status === filters.status);
        }
        resolve(records);
      }, 300);
    });
  }
};