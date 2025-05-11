import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PostDetailsPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/posts/${id}`);
        const result = await res.json();
        if (result.success) {
          setPost(result.data);
        } else {
          alert("Post not found");
        }
      } catch (err) {
        console.error("Error fetching post", err);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <div className="post-details-container">
      <div className="post-details-card">
        <h1 className="post-details-title">{post.title}</h1>

        {post.coverImage && (
          <img
            src={post.coverImage}
            alt={post.title}
            className="post-details-image"
          />
        )}

        <div className="post-details-meta">
          <p>
            <strong>Author:</strong> {post.username}
          </p>
          <p>
            <strong>Country:</strong> {post.country}
          </p>
          <p>
            <strong>Date of Visit:</strong> {post.dateOfVisit}
          </p>
        </div>

        <div className="post-details-content">
          <p>{post.content}</p>
        </div>
      </div>
    </div>
  );
};

export default PostDetailsPage;
