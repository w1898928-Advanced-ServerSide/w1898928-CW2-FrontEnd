import api from './api';

export const followService = {
  followUser: async (userId) => {
    const res = await api.post(`/api/follow/${userId}`);
    return res.data;
  },

  unfollowUser: async (userId) => {
    const res = await api.delete(`/api/follow/${userId}`);
    return res.data;
  },

  isFollowing: async (userId) => {
    const res = await api.get(`/api/follow/is-following/${userId}`);
    return res.data;
  },

  getFollowers: async (userId) => {
    const res = await api.get(`/api/follow/followers/${userId}`);
    return res.data;
  },

  getFollowing: async (userId) => {
    const res = await api.get(`/api/follow/following/${userId}`);
    return res.data;
  },

  getSuggestions: async () => {
    const res = await api.get(`/api/follow/suggestions`);
    return res.data;
  },

  getFollowCounts: async (userId) => {
    const res = await api.get(`/api/follow/counts/${userId}`);
    return res.data;
  },
};
