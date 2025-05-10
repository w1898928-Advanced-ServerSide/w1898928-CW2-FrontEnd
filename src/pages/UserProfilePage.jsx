import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { postService } from "../services/postService";
import { followService } from "../services/followService";
import FollowButton from "../components/FollowButton";
import PostCard from "../components/PostCard";

const UserProfilePage = () => {
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("");
  const [followCounts, setFollowCounts] = useState({
    followers: 0,
    following: 0,
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      const postsRes = await postService.getPostsByUserId(userId);
      if (postsRes.success) {
        setPosts(postsRes.data);
        if (postsRes.data.length > 0) setUsername(postsRes.data[0].username);
      }

      const countsRes = await followService.getFollowCounts(userId);
      if (countsRes.success) setFollowCounts(countsRes.data);
    };

    fetchProfileData();
  }, [userId]);

  return (
    <div className="dashboard">
      <h2>{username}'s Profile</h2>
      <p>
        <strong>Followers:</strong> {followCounts.followers} |{" "}
        <strong>Following:</strong> {followCounts.following}
        <FollowButton targetUserId={parseInt(userId)} />
      </p>

      <h3>{username}'s Blog Posts</h3>
      {posts.length === 0 ? (
        <p>This user hasn’t created any posts yet.</p>
      ) : (
        posts.map((post) => <PostCard key={post.blogPostId} post={post} />)
      )}
    </div>
  );
};

export default UserProfilePage;
