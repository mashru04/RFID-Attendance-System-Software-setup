import { dummyAttendance } from "../data/dummyAttendance";
import { dummyStudents } from "../data/dummyStudents";
// import api from "./api"; // TODO: uncomment when backend is ready

export const studentService = {
  getMyDashboard: async (studentId) => {
    // TODO: replace with: const res = await api.get(`/student/${studentId}/dashboard`); return res.data;
    return new Promise((resolve) => {
      setTimeout(() => {
        const attendance = dummyAttendance.filter(a => a.studentId === studentId);
        const present = attendance.filter(a => a.status === "Present").length;
        const late = attendance.filter(a => a.status === "Late").length;
        const absent = attendance.filter(a => a.status === "Absent").length;
        const total = attendance.length;
        const percentage = total > 0 ? Math.round(((present + late) / total) * 100) : 0;
        
        // Find today's status
        const today = new Date().toISOString().split('T')[0];
        // Mocking 'today' for dummy data since dummy data uses specific dates
        const mockToday = "2023-10-27"; 
        const todayRecord = attendance.find(a => a.date === mockToday);

        resolve({
          todayStatus: todayRecord ? todayRecord.status : "No record",
          percentage,
          present,
          late,
          absent,
          total
        });
      }, 300);
    });
  },

  getMyAttendance: async (studentId) => {
    // TODO: replace with: const res = await api.get(`/student/${studentId}/attendance`); return res.data;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(dummyAttendance.filter(a => a.studentId === studentId));
      }, 300);
    });
  },

  getMyProfile: async (studentId) => {
    // TODO: replace with: const res = await api.get(`/student/${studentId}/profile`); return res.data;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const student = dummyStudents.find(s => s.id === studentId);
        if (student) resolve(student);
        else reject(new Error("Student not found"));
      }, 300);
    });
  }
};
