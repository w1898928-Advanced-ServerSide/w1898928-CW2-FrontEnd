const API_BASE = 'http://localhost:4000/api/posts';

export const postService = {
  getAllPosts: async () => {
    const res = await fetch(API_BASE);
    return await res.json();
  },

  createPost: async (title, content, country, dateOfVisit, coverImage) => {
    const res = await fetch("http://localhost:4000/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({ title, content, country, dateOfVisit, coverImage })
    });
  
    return await res.json();
  },

  getPostById: async (postId) => {
    const res = await fetch(`${API_BASE}/${postId}`);
    return await res.json();
  },

  updatePost: async (id, title, content, country, dateOfVisit, coverImage) => {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, country, dateOfVisit, coverImage }),
    });
    return await res.json();
  },

  getPostsByUserId: async (userId) => {
    const res = await fetch(`http://localhost:4000/api/posts/user/${userId}`);
    return await res.json();
  },
  
  searchPosts: async (term) => {
    const res = await fetch(`http://localhost:4000/api/posts/search/${encodeURIComponent(term)}`);
    return await res.json();
  }

};
