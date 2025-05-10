import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { postService } from "../services/postService";
import { followService } from "../services/followService";
import PostCard from "../components/PostCard";
import FollowButton from "../components/FollowButton";

const DashboardPage = () => {
  const { user } = useAuth();
  const nav = useNavigate();
  const [posts, setPosts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [followCounts, setFollowCounts] = useState({
    followers: 0,
    following: 0,
  });

  useEffect(() => {
    if (!user) {
      nav("/login");
      return;
    }

    const fetchPosts = async () => {
      const result = await postService.getPostsByUserId(user.userId);
      if (result.success) setPosts(result.data);
    };

    const fetchSuggestions = async () => {
      const res = await followService.getSuggestions(user.userId);
      if (res.success) setSuggestions(res.data);
    };

    const fetchCounts = async () => {
      const res = await followService.getFollowCounts(user.userId);
      if (res.success) setFollowCounts(res.data);
    };

    fetchPosts();
    fetchSuggestions();
    fetchCounts();
  }, [user, nav]);

  return (
    <div className="dashboard">
      <h2>Welcome, {user?.email || "User"}!</h2>

      <p>
        <a href={`/followers/${user.userId}`}>
          Followers ({followCounts.followers})
        </a>{" "}
        |{" "}
        <a href={`/following/${user.userId}`}>
          Following ({followCounts.following})
        </a>
      </p>

      <h3>Your Blog Posts ✍️</h3>
      {posts.length === 0 ? (
        <p>You haven't created any posts yet.</p>
      ) : (
        posts.map((post) => (
          <PostCard key={post.blogPostId} post={post} isProfile={true} />
        ))
      )}

      <h3>Suggested Users to Follow</h3>
      {suggestions.length === 0 ? (
        <p>No suggestions at this time.</p>
      ) : (
        <ul className="user-list">
          {suggestions.map((u) => (
            <li key={u.id}>
              {u.username}
              <FollowButton targetUserId={u.id} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DashboardPage;
