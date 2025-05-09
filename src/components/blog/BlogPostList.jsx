import React from 'react';
import BlogPostCard from './BlogPostCard';
import LoadingSpinner from '../common/LoadingSpinner';

const BlogPostList = ({ posts, loading }) => {
  if (loading) return <LoadingSpinner />;
  if (!posts || posts.length === 0) {
    return <div className="no-posts">No posts found</div>;
  }

  return (
    <div className="blog-post-list">
      {posts.map((post) => (
        <BlogPostCard key={post.blogPostId} post={post} />
      ))}
    </div>
  );
};

export default BlogPostList;