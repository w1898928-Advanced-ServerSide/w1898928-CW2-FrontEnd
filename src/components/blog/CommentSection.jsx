import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  getCommentsByPostId,
  createComment,
  deleteComment,
} from "../../services/commentService";
import LoadingSpinner from "../common/LoadingSpinner";
import ErrorMessage from "../common/ErrorMessage";
import "./CommentSection.css";


const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getCommentsByPostId(postId);
        setComments(data);
      } catch (err) {
        setError(err.message || "Failed to load comments");
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const comment = await createComment(postId, {
        content: newComment,
        userId: user.id,
      });
      setComments([comment, ...comments]);
      setNewComment("");
    } catch (err) {
      setError(err.message || "Failed to post comment");
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments(comments.filter((c) => c.id !== commentId));
    } catch (err) {
      setError(err.message || "Failed to delete comment");
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="comment-section">
      <h3>Comments ({comments.length})</h3>

      {isAuthenticated && (
        <form onSubmit={handleSubmit} className="comment-form">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts..."
            rows={3}
            required
          />
          <button type="submit" className="post-comment-button">
            Post Comment
          </button>
        </form>
      )}

      <div className="comments-list">
        {comments.length === 0 ? (
          <p className="no-comments">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="comment">
              <div className="comment-header">
                <div className="comment-author">
                  <img
                    src={comment.user.avatar || "/default-avatar.png"}
                    alt={comment.user.username}
                  />
                  <span>{comment.user.username}</span>
                </div>
                <span className="comment-date">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="comment-content">{comment.content}</div>
              {user && (user.id === comment.user.id || user.isAdmin) && (
                <button
                  onClick={() => handleDelete(comment.id)}
                  className="delete-comment-button"
                >
                  Delete
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
