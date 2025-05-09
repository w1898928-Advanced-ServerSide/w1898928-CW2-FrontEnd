import React, { useState, useContext } from "react";
import { useReaction } from "../../services/reactionService";
import { AuthContext } from "../../context/AuthContext";
import "./ReactionButtons.css";

const ReactionButtons = ({ postId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user, isAuthenticated } = useContext(AuthContext);
  const { reactions, userReaction, toggleReaction } = useReaction(postId);

  const handleReaction = async (type) => {
    if (!isAuthenticated) return;
    setIsLoading(true);
    try {
      await toggleReaction(type);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="reaction-buttons">
      <button
        onClick={() => handleReaction("like")}
        disabled={isLoading}
        className={`like-button ${userReaction === "like" ? "active" : ""}`}
      >
        👍 {reactions.likes}
      </button>
      <button
        onClick={() => handleReaction("dislike")}
        disabled={isLoading}
        className={`dislike-button ${
          userReaction === "dislike" ? "active" : ""
        }`}
      >
        👎 {reactions.dislikes}
      </button>
    </div>
  );
};

export default ReactionButtons;
