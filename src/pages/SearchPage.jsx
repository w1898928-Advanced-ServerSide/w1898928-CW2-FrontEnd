import React, { useState } from "react";
import { postService } from "../services/postService";
import PostCard from "../components/PostCard";

const SearchPage = () => {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (term.trim() === "") return;

    const res = await postService.searchPosts(term);
    if (res.success) {
      setResults(res.data);
      setSearched(true);
    }
  };

  return (
    <div className="dashboard">
      <h2>Search TravelTales 🌍</h2>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Enter country, title or keyword"
        />
        <button type="submit">Search</button>
      </form>

      {searched && (
        <>
          <h3>Results for "{term}"</h3>
          {results.length === 0 ? (
            <p>No results found.</p>
          ) : (
            results.map((post) => (
              <PostCard key={post.blogPostId} post={post} />
            ))
          )}
        </>
      )}
    </div>
  );
};

export default SearchPage;
