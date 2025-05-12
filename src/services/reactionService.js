// src/services/reactionService.js
import api from '../api';

export const reactionService = {
  toggleReaction: async (postId, type) => {
    const res = await api.post(`/api/reactions/${postId}/${type}`);
    return res.data;
  },

  getReactionsForPost: async (postId) => {
    const res = await api.get(`/api/reactions/post/${postId}`);
    return res.data;
  },

  getUserReaction: async (postId) => {
    const res = await api.get(`/api/reactions/user/${postId}`);
    return res.data;
  },

  removeReaction: async (postId) => {
    const res = await api.delete(`/api/reactions/reactions/${postId}`);
    return res.data;
  },
};
