import { Post } from "../dtos/PostDto";

const API_BASE = "http://localhost:4000/api/posts";

export const postService = {
  getAllPosts: async () => {
    const res = await fetch(API_BASE);
    const result = await res.json();
    if (result.success) {
      return {
        success: true,
        data: result.data.map(post => new Post(post))
      };
    }
    return result;
  },

  getPostById: async (id) => {
    const res = await fetch(`${API_BASE}/${id}`);
    const result = await res.json();
    if (result.success) {
      return {
        success: true,
        data: new Post(result.data)
      };
    }
    return result;
  },

  getPostsByUserId: async (userId) => {
    const res = await fetch(`${API_BASE}/user/${userId}`);
    const result = await res.json();
    if (result.success) {
      return {
        success: true,
        data: result.data.map(post => new Post(post))
      };
    }
    return result;
  },

  createPost: async (title, content, country, dateOfVisit, coverImage) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("country", country);
    formData.append("dateOfVisit", dateOfVisit);
    if (coverImage) formData.append("coverImage", coverImage);

    const res = await fetch(API_BASE, {
      method: "POST",
      credentials: "include",
      body: formData
    });

    return await res.json();
  }
};
