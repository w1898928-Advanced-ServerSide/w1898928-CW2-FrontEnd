import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  createBlogPost, 
  updateBlogPost, 
  getBlogPostById 
} from '../../services/blogService';
import countries from '../../data/countries';
import ErrorMessage from '../common/ErrorMessage';

const BlogPostForm = ({ editMode = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [country, setCountry] = useState('');
  const [dateOfVisit, setDateOfVisit] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editMode && id) {
      const fetchPost = async () => {
        try {
          const post = await getBlogPostById(id);
          setTitle(post.title);
          setContent(post.content);
          setCountry(post.country);
          setDateOfVisit(post.dateOfVisit.split('T')[0]);
          setCoverImage(post.coverImage || '');
        } catch (err) {
          setError(err.message || 'Failed to load post');
        }
      };
      fetchPost();
    }
  }, [editMode, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const postData = { title, content, country, dateOfVisit, coverImage };
      
      if (editMode) {
        await updateBlogPost(id, postData);
      } else {
        await createBlogPost(postData);
      }
      
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to save post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="blog-post-form">
      <h2>{editMode ? 'Edit Post' : 'Create New Post'}</h2>
      {error && <ErrorMessage message={error} />}
      
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      
      <div className="form-group">
        <label>Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      
      <div className="form-group">
        <label>Country Visited</label>
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        >
          <option value="">Select a country</option>
          {countries.map((c) => (
            <option key={c.code} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      
      <div className="form-group">
        <label>Date of Visit</label>
        <input
          type="date"
          value={dateOfVisit}
          onChange={(e) => setDateOfVisit(e.target.value)}
          required
        />
      </div>
      
      <div className="form-group">
        <label>Cover Image URL (optional)</label>
        <input
          type="url"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
          placeholder="https://example.com/image.jpg"
        />
      </div>
      
      <button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Save Post'}
      </button>
    </form>
  );
};

export default BlogPostForm;