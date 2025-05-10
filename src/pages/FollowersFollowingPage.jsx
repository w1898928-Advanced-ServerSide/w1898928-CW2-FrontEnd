import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { followService } from "../services/followService";

const FollowersFollowingPage = () => {
  const { userId, type } = useParams(); // type = 'followers' or 'following'
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchList = async () => {
      const res =
        type === "followers"
          ? await followService.getFollowers(userId)
          : await followService.getFollowing(userId);

      if (res.success) setUsers(res.data);
    };

    fetchList();
  }, [userId, type]);

  return (
    <div className="followers-page">
      <h2>{type === "followers" ? "Followers" : "Following"}</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul className="user-list">
          {users.map((user) => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FollowersFollowingPage;
