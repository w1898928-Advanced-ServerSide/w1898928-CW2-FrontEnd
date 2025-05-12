import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { reactionService } from "../services/reactionService";
import { restCountryService } from "../services/countryService";
import FollowButton from "./FollowButton";

const PostCard = ({ post, isProfile = false }) => {
  const { user } = useAuth();
  const nav = useNavigate();

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userReaction, setUserReaction] = useState(null);
  const [countryInfo, setCountryInfo] = useState(null);

  const isOwner = isProfile && user?.userId === post.userId;

  useEffect(() => {
    const fetchReactions = async () => {
      const res = await reactionService.getReactionsForPost(post.blogPostId);
      if (res.success) {
        setLikes(res.data.likes);
        setDislikes(res.data.dislikes);
      }

      if (user) {
        const userRes = await reactionService.getUserReaction(post.blogPostId);
        if (userRes.success) {
          setUserReaction(userRes.data.reaction);
        }
      }
    };

    const fetchCountryInfo = async () => {
      const info = await restCountryService.getCountryDetails(post.country);
      setCountryInfo(info);
    };

    fetchReactions();
    fetchCountryInfo();
  }, [post.blogPostId, post.country, user]);

  const handleViewPost = () => nav(`/post/${post.blogPostId}`);

  const handleEdit = (e) => {
    e.stopPropagation();
    nav(`/edit/${post.blogPostId}`);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this post?")) {
      const res = await fetch(
        `http://localhost:4000/api/posts/${post.blogPostId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (data.success) {
        alert("Post deleted!");
        window.location.reload();
      } else {
        alert(data.message || "Failed to delete");
      }
    }
  };

  const handleReaction = async (type, e) => {
    e.stopPropagation();
    const res = await reactionService.toggleReaction(post.blogPostId, type);
    if (res.success) {
      setUserReaction((prev) => (prev === type ? null : type));
      const updated = await reactionService.getReactionsForPost(
        post.blogPostId
      );
      if (updated.success) {
        setLikes(updated.data.likes);
        setDislikes(updated.data.dislikes);
      }
    }
  };

  return (
    <div
      className="post-card"
      onClick={handleViewPost}
      style={{ cursor: "pointer" }}
    >
      {post.coverImage && (
        <img src={post.coverImage} alt={post.title} className="cover-img" />
      )}

      <h3>{post.title}</h3>
      <p>{post.content.slice(0, 100)}...</p>

      <div className="meta">
        <span>
          {post.country} | {post.dateOfVisit} | By{" "}
          <a
            href={`/profile/${post.userId}`}
            className="profile-link"
            onClick={(e) => e.stopPropagation()}
          >
            {post.username}
          </a>
        </span>
        {!isOwner && (
          <span onClick={(e) => e.stopPropagation()}>
            <FollowButton targetUserId={post.userId} />
          </span>
        )}
      </div>

      {countryInfo && (
        <div className="country-info">
          <img src={countryInfo.flag} alt="flag" className="flag" />
          <p>
            <strong>Capital:</strong> {countryInfo.capital}
          </p>
          <p>
            <strong>Currency:</strong> {countryInfo.currency} 
          </p>
        </div>
      )}

      <div className="reaction-bar">
        <button
          onClick={(e) => handleReaction("like", e)}
          className={userReaction === "like" ? "active-reaction" : ""}
        >
          <span
            className="material-icons"
            style={{ color: userReaction === "like" ? "#dc3545" : "#666" }}
          >
            thumb_up
          </span>{" "}
          {likes}
        </button>
        <button
          onClick={(e) => handleReaction("dislike", e)}
          className={userReaction === "dislike" ? "active-reaction" : ""}
        >
          <span
            className="material-icons"
            style={{ color: userReaction === "dislike" ? "#dc3545" : "#666" }}
          >
            thumb_down
          </span>{" "}
          {dislikes}
        </button>
      </div>

      {isOwner && (
        <div className="post-actions">
          <button onClick={handleEdit}>
            <span className="material-icons" style={{ marginRight: "5px" }}>
              edit
            </span>
            Edit
          </button>
          <button onClick={handleDelete}>
            <span className="material-icons" style={{ marginRight: "5px" }}>
              delete
            </span>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default PostCard;
