import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { postService } from "../services/postService";
import { followService } from "../services/followService";
import PostCard from "../components/PostCard";

const DashboardPage = () => {
  const { user } = useAuth();
  const nav = useNavigate();
  const [posts, setPosts] = useState([]);
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

    const fetchCounts = async () => {
      const res = await followService.getFollowCounts(user.userId);
      if (res.success) setFollowCounts(res.data);
    };

    fetchPosts();
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

      <h3>
        <span
          className="material-icons"
          style={{
            fontSize: "35px",
            color: "#0077cc",
            verticalAlign: "middle",
            marginRight: "8px",
          }}
        >
          article
        </span>
        Your Blog Posts
      </h3>

      {posts.length === 0 ? (
        <p>You haven't created any posts yet.</p>
      ) : (
        posts.map((post) => (
          <PostCard key={post.blogPostId} post={post} isProfile={true} />
        ))
      )}
    </div>
  );
};

export default DashboardPage;
