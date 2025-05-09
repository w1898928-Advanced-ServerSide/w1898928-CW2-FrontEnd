import React from 'react';
import { Link } from 'react-router-dom';
import ReactionButtons from './ReactionButtons';
import CountryFlag from '../country/CountryFlag';

const BlogPostCard = ({ post }) => {
  return (
    <div className="blog-post-card">
      {post.coverImage && (
        <div className="card-image">
          <img src={post.coverImage} alt={post.title} />
        </div>
      )}
      <div className="card-content">
        <h3>
          <Link to={`/posts/${post.blogPostId}`}>{post.title}</Link>
        </h3>
        <div className="post-meta">
          <span className="author">
            <Link to={`/profile/${post.username}`}>{post.username}</Link>
          </span>
          <span className="date">
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>
        <div className="country-info">
          <CountryFlag country={post.country} />
          <span>{post.country}</span>
        </div>
        <div className="post-excerpt">
          {post.content.substring(0, 150)}...
          <Link to={`/posts/${post.blogPostId}`} className="read-more">
            Read more
          </Link>
        </div>
        <ReactionButtons postId={post.blogPostId} />
      </div>
    </div>
  );
};

export default BlogPostCard;