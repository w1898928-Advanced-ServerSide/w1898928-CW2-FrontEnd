import React, { useEffect, useState } from "react";
import { followService } from "../services/followService";
import { useAuth } from "../context/AuthContext";

const FollowButton = ({ targetUserId }) => {
  const { user } = useAuth();
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const check = async () => {
      if (user?.userId && targetUserId !== user.userId) {
        const res = await followService.isFollowing(targetUserId);
        if (res.success) setIsFollowing(res.data.isFollowing);
      }
    };
    check();
  }, [user, targetUserId]);

  const toggleFollow = async () => {
    if (isFollowing) {
      await followService.unfollowUser(targetUserId);
      setIsFollowing(false);
    } else {
      await followService.followUser(targetUserId);
      setIsFollowing(true);
    }
  };

  if (!user || user.userId === targetUserId) return null;

  return (
    <button onClick={toggleFollow} className="follow-btn">
      {isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
};

export default FollowButton;
