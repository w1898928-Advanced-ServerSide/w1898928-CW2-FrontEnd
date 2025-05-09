import React, { useState, useEffect, useContext } from 'react';
import { followUser, unfollowUser, isFollowing } from '../../services/followService';
import { AuthContext } from '../../context/AuthContext';

const FollowButton = ({ userId, small = false }) => {
  const [isFollowingState, setIsFollowingState] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user: currentUser, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const checkFollowingStatus = async () => {
      if (isAuthenticated && currentUser && userId) {
        try {
          const response = await isFollowing(currentUser.id, userId);
          setIsFollowingState(response.isFollowing);
        } catch (err) {
          console.error('Error checking follow status:', err);
        }
      }
    };
    
    checkFollowingStatus();
  }, [isAuthenticated, currentUser, userId]);

  const handleFollow = async () => {
    if (!isAuthenticated || !currentUser) return;
    
    setLoading(true);
    try {
      if (isFollowingState) {
        await unfollowUser(currentUser.id, userId);
        setIsFollowingState(false);
      } else {
        await followUser(currentUser.id, userId);
        setIsFollowingState(true);
      }
    } catch (err) {
      console.error('Error following/unfollowing:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated || currentUser.id === userId) return null;

  return (
    <button
      onClick={handleFollow}
      disabled={loading}
      className={`follow-button ${small ? 'small' : ''} ${isFollowingState ? 'following' : ''}`}
    >
      {loading ? (
        '...'
      ) : isFollowingState ? (
        'Following'
      ) : (
        'Follow'
      )}
    </button>
  );
};

export default FollowButton;