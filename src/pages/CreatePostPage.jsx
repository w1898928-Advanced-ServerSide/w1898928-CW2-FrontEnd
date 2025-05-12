import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { countryService } from "../services/countryService";

const CreatePostPage = () => {
  const { user } = useAuth();
  const nav = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [country, setCountry] = useState("");
  const [dateOfVisit, setDateOfVisit] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [countryList, setCountryList] = useState([]);

  useEffect(() => {
    if (!user) {
      nav("/login");
    } else {
      countryService.getAllCountries().then(setCountryList);
    }
  }, [user, nav]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("country", country);
    formData.append("dateOfVisit", dateOfVisit);
    if (imageFile) formData.append("coverImage", imageFile);

    try {
      const res = await fetch("http://localhost:4000/api/posts", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const result = await res.json();
      if (result.success) {
        alert("Post created!");
        nav("/dashboard");
      } else {
        alert(result.message || "Failed to create post");
      }
    } catch (err) {
      console.error("Error creating post:", err);
      alert("Something went wrong");
    }
  };

  const selectedCountry = countryList.find((c) => c.name === country);

  return (
    <div className="create-post-form">
      <h2>
        <span
          className="material-icons"
          style={{
            fontSize: "45px",
            color: "#0077cc",
            verticalAlign: "middle",
            marginRight: "10px",
          }}
        >
          edit_note
        </span>
        Create New Blog Post
      </h2>

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

        <div className="submit-wrapper">
          <button className="submit" type="submit">
            Publish Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostPage;
