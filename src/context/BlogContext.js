import React, { createContext, useState, useContext } from 'react';
import { getRecentBlogPosts } from '../services/blogService';

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchRecentPosts = async () => {
    setLoading(true);
    try {
      const posts = await getRecentBlogPosts();
      setRecentPosts(posts);
    } catch (err) {
      setError(err.message || 'Failed to fetch recent posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentPosts();
  }, []);

  return (
    <BlogContext.Provider
      value={{
        recentPosts,
        loading,
        error,
        refreshPosts: fetchRecentPosts
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};