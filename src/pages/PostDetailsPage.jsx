import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { restCountryService } from "../services/countryService";

const PostDetailsPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [countryInfo, setCountryInfo] = useState(null);

  useEffect(() => {
    const fetchPostAndCountry = async () => {
      try {
        const res = await fetch(`http://localhost:4002/api/posts/${id}`);
        const result = await res.json();
        if (result.success) {
          setPost(result.data);

          // Fetch country details after getting post
          const countryData = await restCountryService.getCountryDetails(
            result.data.country
          );
          setCountryInfo(countryData);
        } else {
          alert("Post not found");
        }
      } catch (err) {
        console.error("Error fetching post:", err);
      }
    };

    fetchPostAndCountry();
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
          {countryInfo && (
            <div className="country-details">
              <img
                src={countryInfo.flag}
                alt="Flag"
                style={{ width: "80px" }}
              />
              <p>
                <strong>Capital:</strong> {countryInfo.capital}
              </p>
              <p>
                <strong>Language:</strong> {countryInfo.language}
              </p>
              <p>
                <strong>currency:</strong> {countryInfo.currency}
              </p>
            </div>
          )}

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
