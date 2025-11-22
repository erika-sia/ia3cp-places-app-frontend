import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Auth from './user/pages/Auth';
import NewPlace from './places/pages/NewPlace';
import Home from './pages/Home';
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem('userData');
    if (savedData) {
      const userData = JSON.parse(savedData);
      if (userData.token) {
        setIsLoggedIn(true);
        setUserId(userData.userId);
      }
    }
  }, []);

  const handleLogin = (uid, token) => {
    setIsLoggedIn(true);
    setUserId(uid);
    localStorage.setItem('userData', JSON.stringify({ userId: uid, token: token }));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserId(null);
  };

  return (
    <Router>
      <main>
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/" element={<Home onLogout={handleLogout} />} />
              <Route path="/places/new" element={<NewPlace userId={userId} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          ) : (
            <>
              <Route path="/auth" element={<Auth onLogin={handleLogin} />} />
              <Route path="*" element={<Navigate to="/auth" replace />} />
            </>
          )}
        </Routes>
      </main>
    </Router>
  );
};

export default App;
