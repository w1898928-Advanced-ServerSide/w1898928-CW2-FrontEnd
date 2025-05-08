import React from "react";
import { useParams } from "react-router-dom";
import BlogPost from "../components/blog/BlogPost";
import CommentSection from "../components/blog/CommentSection";

const BlogPage = () => {
  const { id } = useParams();

  return (
    <div className="blog-page">
      <BlogPost id={id} />
      <CommentSection postId={id} />
    </div>
  );
};

export default BlogPage;
