import api from './api';

export const getBlogPostById = async (id) => {
  const response = await api.get(`/posts/${id}`);
  return response.data;
};

export const getAllBlogPosts = async () => {
  const response = await api.get('/posts');
  return response.data;
};

export const getBlogPostsByUserId = async (userId) => {
  const response = await api.get(`/posts/user/${userId}`);
  return response.data;
};

export const getBlogPostsByCountry = async (country) => {
  const response = await api.get(`/posts/country/${country}`);
  return response.data;
};

export const createBlogPost = async (postData) => {
  const response = await api.post('/posts', postData);
  return response.data;
};

export const updateBlogPost = async (id, postData) => {
  const response = await api.put(`/posts/${id}`, postData);
  return response.data;
};

export const deleteBlogPost = async (id) => {
  const response = await api.delete(`/posts/${id}`);
  return response.data;
};

export const searchBlogPosts = async (term) => {
  const response = await api.get(`/posts/search/${term}`);
  return response.data;
};

export const getRecentBlogPosts = async (limit = 5) => {
  const response = await api.get('/posts/recent/posts', { params: { limit } });
  return response.data;
};