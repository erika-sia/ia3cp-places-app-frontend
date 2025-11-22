import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Button = ({ children, onClick, type = 'button' }) => {
  return (
    <button type={type} onClick={onClick} className="button">
      {children}
    </button>
  );
};

const Home = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userData');
    onLogout();
  };

  return (
    <div className="home-page">
      <div className="home-header">
        <h1>Welcome!</h1>
        <div className="home-actions">
          <Button onClick={() => navigate('/places/new')}>
            ADD NEW PLACE
          </Button>
          <Button onClick={handleLogout} className="button-inverse">
            LOGOUT
          </Button>
        </div>
      </div>
      <div className="home-content">
        <p>You are logged in successfully!</p>
        <p>Click "ADD NEW PLACE" to share a place with an image.</p>
      </div>
    </div>
  );
};

export default Home;

