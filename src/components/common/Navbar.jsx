import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { logout } from '../../services/authService';

const Navbar = () => {
  const { user, isAuthenticated, setIsAuthenticated, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      setIsAuthenticated(false);
      setUser(null);
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">TravelTales</Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/posts">All Posts</Link>
        
        {isAuthenticated ? (
          <>
            <Link to="/create-post">Create Post</Link>
            <Link to={`/profile/${user.username}`}>Profile</Link>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;