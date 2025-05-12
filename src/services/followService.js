const API = 'http://localhost:4002/api/follow';

export const followService = {
  followUser: async (userId) => {
    const res = await fetch(`${API}/${userId}`, {
      method: 'POST',
      credentials: 'include'
    });
    return await res.json();
  },

  unfollowUser: async (userId) => {
    const res = await fetch(`${API}/${userId}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    return await res.json();
  },

  isFollowing: async (userId) => {
    const res = await fetch(`${API}/is-following/${userId}`, {
      credentials: 'include'
    });
    return await res.json();
  },

  getFollowers: async (userId) => {
    const res = await fetch(`${API}/followers/${userId}`);
    return await res.json();
  },

  getFollowing: async (userId) => {
    const res = await fetch(`${API}/following/${userId}`);
    return await res.json();
  },

  getSuggestions: async (userId) => {
    const res = await fetch(`${API}/suggestions`, {
      credentials: 'include'
    });
    return await res.json();
  },

  getFollowCounts: async (userId) => {
    const res = await fetch(`${API}/counts/${userId}`);
    return await res.json();
  },
  
};
