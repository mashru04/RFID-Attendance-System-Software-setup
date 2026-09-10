import { dummyUsers } from "../data/dummyUsers";
// import api from "./api"; // TODO: uncomment when backend is ready

export const authService = {
  login: async (id, password) => {
    // TODO: replace with: const res = await api.post('/auth/login', { id, password }); return res.data;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = dummyUsers.find((u) => u.id === id && u.password === password);
        if (user) {
          const token = `fake-token-${user.role}-${user.id}`;
          // don't leak password
          const { password: _, ...userWithoutPassword } = user;
          resolve({ user: userWithoutPassword, token });
        } else {
          reject(new Error("Invalid ID or password"));
        }
      }, 500);
    });
  },

  register: async (userData) => {
    // TODO: replace with: const res = await api.post('/auth/register', userData); return res.data;
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = {
          ...userData,
          role: userData.role || "student", // default role
        };
        // We aren't persisting it to dummyUsers to keep it simple, just simulating success
        resolve({ user: newUser });
      }, 500);
    });
  },
  
  logout: () => {
    // TODO: replace with: await api.post('/auth/logout'); (if server-side logout exists)
    // We handle localStorage clearing in the Context.
    return Promise.resolve();
  }
};
