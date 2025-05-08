import api from './api';

export const followUser = async (followerId, followingId) => {
  const response = await api.post(`/follow/${followingId}`, { followerId });
  return response.data;
};

export const unfollowUser = async (followerId, followingId) => {
  const response = await api.delete(`/follow/${followingId}`);
  return response.data;
};

export const getFollowers = async (userId) => {
  const response = await api.get(`/follow/followers/${userId}`);
  return response.data;
};

export const getFollowing = async (userId) => {
  const response = await api.get(`/follow/following/${userId}`);
  return response.data;
};

export const isFollowing = async (followerId, followingId) => {
  const response = await api.get(`/follow/is-following/${followingId}`);
  return response.data;
};

export const getFollowCounts = async (userId) => {
  const response = await api.get(`/follow/counts/${userId}`);
  return response.data;
};

export const getFollowSuggestions = async (userId, limit = 5) => {
  const response = await api.get('/follow/suggestions', { params: { limit } });
  return response.data;
};