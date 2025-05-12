// src/services/postService.js
import api from '../api';

export const postService = {
  getAllPosts: async () => {
    const res = await api.get('/api/posts');
    return res.data;
  },

  getPostById: async (id) => {
    const res = await api.get(`/api/posts/${id}`);
    return res.data;
  },

  createPost: async (title, content, country, dateOfVisit, coverImage) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("country", country);
    formData.append("dateOfVisit", dateOfVisit);
    if (coverImage) formData.append("coverImage", coverImage);

    const res = await api.post('/api/posts', formData);
    return res.data;
  },

  updatePost: async (postId, formData) => {
    const res = await api.put(`/api/posts/${postId}`, formData);
    return res.data;
  },

  deletePost: async (postId) => {
    const res = await api.delete(`/api/posts/${postId}`);
    return res.data;
  },

  getPostsByUserId: async (userId) => {
    const res = await api.get(`/api/posts/user/${userId}`);
    return res.data;
  },

  searchPosts: async (term) => {
    const res = await api.get(`/api/posts/search/${encodeURIComponent(term)}`);
    return res.data;
  },
};
