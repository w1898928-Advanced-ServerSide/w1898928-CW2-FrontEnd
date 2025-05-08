import api from './api';

export const addReaction = async (userId, postId, reactionType) => {
  const response = await api.post(`/reactions/${postId}/${reactionType}`);
  return response.data;
};

export const removeReaction = async (userId, postId) => {
  const response = await api.delete(`/reactions/${postId}`);
  return response.data;
};

export const getReactionsForPost = async (postId) => {
  const response = await api.get(`/reactions/post/${postId}`);
  return response.data;
};

export const getUserReaction = async (userId, postId) => {
  const response = await api.get(`/reactions/user/${postId}`);
  return response.data;
};

export const getMostLikedPosts = async (limit = 5) => {
  const response = await api.get('/reactions/trending', { params: { limit } });
  return response.data;
};

export const toggleReaction = async (userId, postId, reactionType) => {
  const response = await api.post(`/reactions/${postId}/${reactionType}`);
  return response.data;
};