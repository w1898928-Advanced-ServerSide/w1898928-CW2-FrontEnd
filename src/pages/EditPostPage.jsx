import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { postService } from "../services/postService";
import countryList from "../country/countryList.json";

const EditPostPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const nav = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [country, setCountry] = useState("");
  const [dateOfVisit, setDateOfVisit] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      const res = await postService.getPostById(id);
      if (res.success && res.data.userId === user.userId) {
        setTitle(res.data.title);
        setContent(res.data.content);
        setCountry(res.data.country);
        setDateOfVisit(res.data.dateOfVisit);
        setPreview(res.data.coverImage);
      } else {
        alert("Access denied or post not found.");
        nav("/");
      }
    };
    loadPost();
  }, [id, user, nav]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("country", country);
    formData.append("dateOfVisit", dateOfVisit);
    if (imageFile) formData.append("coverImage", imageFile);

    const res = await postService.updatePost(id, formData);
    if (res.success) {
      alert("Post updated!");
      nav("/dashboard");
    } else {
      alert(res.message || "Update failed");
    }
  };

  return (
    <div className="create-post-form">
      <h2>Edit Blog Post</h2>
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
          placeholder="Content"
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
        <input
          type="date"
          value={dateOfVisit}
          onChange={(e) => setDateOfVisit(e.target.value)}
          required
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {preview && <img src={preview} alt="preview" className="preview-img" />}
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditPostPage;
