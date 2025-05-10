const API = 'http://localhost:4000/api/auth';

export const authService = {
  login: async (username, password) => {
    const res = await fetch(`${API}/login`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    return await res.json();
  },

  register: async (username, email, password) => {
    const res = await fetch(`${API}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });
    return await res.json();
  },

  getCurrentUser: async () => {
    const res = await fetch(`${API}/me`, {
      method: 'GET',
      credentials: 'include',
    });
    return await res.json();
  },

  logout: async () => {
    const res = await fetch(`${API}/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    return await res.json();
  }
};
