import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getUserByUsername, getBlogPostsByUserId } from '../../services/userService';
import BlogPostList from '../blog/BlogPostList';
import FollowButton from './FollowButton';
import { AuthContext } from '../../context/AuthContext';
import LoadingSpinner from '../common/LoadingSpinner';

const UserProfile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData, userPosts] = await Promise.all([
          getUserByUsername(username),
          getBlogPostsByUserId(username)
        ]);
        
        setUser(userData);
        setPosts(userPosts);
      } catch (err) {
        setError(err.message || 'Failed to load user profile');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [username]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-message">{error}</div>;
  if (!user) return <div>User not found</div>;

  const isCurrentUser = currentUser && currentUser.username === username;

  return (
    <div className="user-profile">
      <div className="profile-header">
        <div className="profile-avatar">
          <img src={user.avatar || '/default-avatar.png'} alt={user.username} />
        </div>
        <div className="profile-info">
          <h2>{user.username}</h2>
          <p>{user.bio || 'No bio yet'}</p>
          <div className="profile-stats">
            <div className="stat">
              <span className="stat-number">{user.postCount || 0}</span>
              <span className="stat-label">Posts</span>
            </div>
            <div className="stat">
              <span className="stat-number">{user.followerCount || 0}</span>
              <span className="stat-label">Followers</span>
            </div>
            <div className="stat">
              <span className="stat-number">{user.followingCount || 0}</span>
              <span className="stat-label">Following</span>
            </div>
          </div>
        </div>
        {!isCurrentUser && (
          <div className="profile-actions">
            <FollowButton userId={user.id} />
          </div>
        )}
      </div>
      
      <div className="user-posts">
        <h3>{isCurrentUser ? 'Your Posts' : `${user.username}'s Posts`}</h3>
        <BlogPostList posts={posts} />
      </div>
    </div>
  );
};

export default UserProfile;