import { dummyAttendance } from "../data/dummyAttendance";
import { dummyStudents } from "../data/dummyStudents";
import { dummyTeachers } from "../data/dummyTeachers";
// import api from "./api"; // TODO: uncomment when backend is ready

export const teacherService = {
  getTeacherDashboard: async (teacherId) => {
    // TODO: replace with: const res = await api.get(`/teacher/${teacherId}/dashboard`); return res.data;
    return new Promise((resolve) => {
      setTimeout(() => {
        const teacher = dummyTeachers.find(t => t.id === teacherId);
        const assignedClasses = teacher ? teacher.assignedCourses.length : 0;
        
        // Mock today
        const mockToday = "2023-10-27";
        const todayAttendance = dummyAttendance.filter(a => a.date === mockToday && teacher?.assignedCourses.includes(a.courseId));
        const presentCount = todayAttendance.filter(a => a.status === "Present").length;

        resolve({
          assignedClasses,
          todayPresentCount: presentCount,
          totalStudentsInClasses: dummyStudents.length // simplified mock
        });
      }, 300);
    });
  },

  getClassAttendance: async (teacherId, date) => {
    // TODO: replace with: const res = await api.get(`/teacher/${teacherId}/attendance?date=${date}`); return res.data;
    return new Promise((resolve) => {
      setTimeout(() => {
        const teacher = dummyTeachers.find(t => t.id === teacherId);
        if (!teacher) {
          resolve([]);
          return;
        }
        
        // Get attendance for courses taught by this teacher on this date
        const records = dummyAttendance.filter(a => a.date === date && teacher.assignedCourses.includes(a.courseId));
        resolve(records);
      }, 300);
    });
  },

  getMyStudents: async (teacherId) => {
    // TODO: replace with: const res = await api.get(`/teacher/${teacherId}/students`); return res.data;
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock returning all students for simplicity
        resolve(dummyStudents);
      }, 300);
    });
  }
};
