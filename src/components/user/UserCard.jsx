import React from 'react';
import { Link } from 'react-router-dom';
import FollowButton from './FollowButton';

const UserCard = ({ user, showFollowButton = true }) => {
  return (
    <div className="user-card">
      <Link to={`/profile/${user.username}`} className="user-link">
        <div className="user-avatar">
          <img src={user.avatar || '/default-avatar.png'} alt={user.username} />
        </div>
        <div className="user-info">
          <h4>{user.username}</h4>
          <p className="user-bio">{user.bio || 'Travel enthusiast'}</p>
        </div>
      </Link>
      {showFollowButton && (
        <div className="user-action">
          <FollowButton userId={user.id} small />
        </div>
      )}
    </div>
  );
};

export default UserCard;