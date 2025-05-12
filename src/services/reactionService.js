const API = 'http://localhost:4002/api/reactions';

export const reactionService = {
  toggleReaction: async (postId, type) => {
    const res = await fetch(`${API}/${postId}/${type}`, {
      method: "POST",
      credentials: "include"
    });
    return await res.json();
  },

  getReactionsForPost: async (postId) => {
    const res = await fetch(`${API}/post/${postId}`);
    return await res.json();
  },

  getUserReaction: async (postId) => {
    const res = await fetch(`${API}/user/${postId}`, {
      credentials: "include"
    });
    return await res.json();
  },

  removeReaction: async (postId) => {
    const res = await fetch(`${API}/reactions/${postId}`, {
      method: "DELETE",
      credentials: "include"
    });
    return await res.json();
  }
};
