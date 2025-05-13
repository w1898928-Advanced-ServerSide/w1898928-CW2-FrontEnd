import api from './api';

export const authService = {
  login: async (username, password) => {
    try {
      const res = await api.post('/api/auth/login', { username, password });
      return res.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        return { success: false, message: "Invalid username or password" };
      } else {
        return { success: false, message: "Login failed. Try again later." };
      }
    }
  },

  register: async (username, email, password) => {
    const res = await api.post('/api/auth/register', { username, email, password });
    return res.data;
  },

  getCurrentUser: async () => {
    const res = await api.get('/api/auth/me');
    return res.data;
  },

  logout: async () => {
    const res = await api.post('/api/auth/logout');
    return res.data;
  },
};
