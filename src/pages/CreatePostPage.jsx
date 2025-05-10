import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { postService } from "../services/postService";
import countryList from "../country/countryList.json";

const CreatePostPage = () => {
  const { user } = useAuth();
  const nav = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [country, setCountry] = useState("");
  const [dateOfVisit, setDateOfVisit] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!user) nav("/login");
  }, [user, nav]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPreview(URL.createObjectURL(file));

    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await postService.createPost(
      title,
      content,
      country,
      dateOfVisit,
      image
    );
    if (result.success) {
      alert("Post created successfully!");
      nav("/dashboard");
    } else {
      alert(result.message || "Failed to create post");
    }
  };

  const selectedCountry = countryList.find((c) => c.name === country);

  return (
    <div className="create-post-form">
      <h2>Create New Blog Post ✍️</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Your travel story..."
          rows="5"
          required
        />

        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        >
          <option value="">Select Country</option>
          {countryList.map((c) => (
            <option key={c.name} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>

        {selectedCountry && (
          <div className="country-info">
            <img src={selectedCountry.flag} alt="flag" className="flag" />
            <p>
              <strong>Capital:</strong> {selectedCountry.capital}
            </p>
            <p>
              <strong>Currency:</strong> {selectedCountry.currency}
            </p>
          </div>
        )}

        <input
          type="date"
          value={dateOfVisit}
          onChange={(e) => setDateOfVisit(e.target.value)}
          required
        />

        <input type="file" accept="image/*" onChange={handleImageChange} />
        {preview && <img src={preview} alt="Preview" className="preview-img" />}

        <button type="submit">Publish Post</button>
      </form>
    </div>
  );
};

export default CreatePostPage;
