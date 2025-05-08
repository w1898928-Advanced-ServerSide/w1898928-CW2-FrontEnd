import React, { useContext } from "react";
import { useBlog } from "../context/BlogContext";
import BlogPostList from "../components/blog/BlogPostList";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorMessage from "../components/common/ErrorMessage";

const HomePage = () => {
  const { recentPosts, loading, error } = useBlog();

  return (
    <div className="home-page">
      <h1>Welcome to TravelTales</h1>
      <p>Discover amazing travel stories from around the world</p>

      <section className="featured-posts">
        <h2>Recent Travel Stories</h2>
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : (
          <BlogPostList posts={recentPosts} />
        )}
      </section>

      <section className="trending-countries">
        <h2>Popular Destinations</h2>
        {/* Country cards would go here */}
      </section>
    </div>
  );
};

export default HomePage;
