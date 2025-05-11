import React, { useEffect, useState } from "react";
import { postService } from "../services/postService";
import PostCard from "../components/PostCard";

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await postService.getAllPosts();
      if (result.success) setPosts(result.data);
    };
    fetchData();
  }, []);

  return (
    <div className="homepage">
      <h1>
        <span
          className="material-icons"
          style={{
            fontSize: "32px",
            color: "#0077cc",
            verticalAlign: "middle",
            marginRight: "10px",
          }}
        >
          travel_explore
        </span>
        Welcome to TravelTales
      </h1>

      <div className="post-list">
        {posts.map((post) => (
          <PostCard key={post.blogPostId} post={post} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
