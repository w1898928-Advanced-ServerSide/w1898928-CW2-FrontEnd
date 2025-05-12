const API_BASE = "http://localhost:4002/api/posts";

export const postService = {
  // Get all posts
  getAllPosts: async () => {
    const res = await fetch(`${API_BASE}`);
    return await res.json();
  },

  // Get a single post by ID
  getPostById: async (id) => {
    const res = await fetch(`${API_BASE}/${id}`);
    return await res.json();
  },

  // Create a new post (with image)
  createPost: async (title, content, country, dateOfVisit, coverImage) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("country", country);
    formData.append("dateOfVisit", dateOfVisit);
    if (coverImage) formData.append("coverImage", coverImage);

    const res = await fetch(`${API_BASE}`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    return await res.json();
  },

  // Update a post (by ID, using FormData)
  updatePost: async (postId, formData) => {
    const res = await fetch(`${API_BASE}/${postId}`, {
      method: "PUT",
      credentials: "include",
      body: formData,
    });
    return await res.json();
  },

  // Delete a post
  deletePost: async (postId) => {
    const res = await fetch(`${API_BASE}/${postId}`, {
      method: "DELETE",
      credentials: "include",
    });
    return await res.json();
  },

  // Get posts created by a specific user
  getPostsByUserId: async (userId) => {
    const res = await fetch(`${API_BASE}/user/${userId}`);
    return await res.json();
  },

  // Search posts by keyword
  searchPosts: async (term) => {
    const res = await fetch(`${API_BASE}/search/${encodeURIComponent(term)}`);
    return await res.json();
  }
};
