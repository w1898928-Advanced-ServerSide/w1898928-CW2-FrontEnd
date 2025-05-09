import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getBlogPostById } from '../../services/blogService';
import ReactionButtons from './ReactionButtons';
import CommentSection from './CommentSection';
import { AuthContext } from '../../context/AuthContext';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getBlogPostById(id);
        setPost(data);
      } catch (err) {
        setError(err.message || 'Failed to load post');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!post) return <ErrorMessage message="Post not found" />;

  return (
    <div className="blog-post">
      <h1>{post.title}</h1>
      <div className="post-meta">
        <span>By {post.username}</span>
        <span>Visited {post.country} on {new Date(post.dateOfVisit).toLocaleDateString()}</span>
      </div>
      {post.coverImage && (
        <img src={post.coverImage} alt={post.title} className="post-image" />
      )}
      <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />
      
      <ReactionButtons postId={post.blogPostId} />
      
      {user && (
        <div className="post-actions">
          {user.id === post.userId && (
            <>
              <button className="edit-button">Edit Post</button>
              <button className="delete-button">Delete Post</button>
            </>
          )}
        </div>
      )}
      
      <CommentSection postId={post.blogPostId} />
    </div>
  );
};

export default BlogPost;