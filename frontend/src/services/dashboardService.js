import { dummyAttendance } from "../data/dummyAttendance";
// import api from "./api"; // TODO: uncomment when backend is ready

export const dashboardService = {
  getTodayStats: async () => {
    // TODO: replace with: const res = await api.get('/dashboard/stats'); return res.data;
    return new Promise(resolve => {
      setTimeout(() => {
        const mockToday = "2023-10-27";
        const todayAttendance = dummyAttendance.filter(a => a.date === mockToday);
        
        resolve({
          present: todayAttendance.filter(a => a.status === "Present").length,
          late: todayAttendance.filter(a => a.status === "Late").length,
          absent: todayAttendance.filter(a => a.status === "Absent").length,
          total: todayAttendance.length
        });
      }, 300);
    });
  },

  getLiveFeed: async () => {
    // TODO: replace with: const res = await api.get('/dashboard/live-feed'); return res.data;
    return new Promise(resolve => {
      setTimeout(() => {
        // Return 5 random records to simulate live feed
        const shuffled = [...dummyAttendance].sort(() => 0.5 - Math.random());
        resolve(shuffled.slice(0, 5));
      }, 300);
    });
  }
};
