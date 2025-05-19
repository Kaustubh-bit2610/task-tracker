// src/components/LogoutButton.jsx (or inside TaskPage.jsx)
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token from localStorage or sessionStorage
    localStorage.removeItem('token'); // or sessionStorage.removeItem('token')

    // Redirect to login page
    navigate('/login');
  };

  return (
    <button onClick={handleLogout} style={{ padding: '10px', background: 'red', color: 'white' }}>
      Logout
    </button>
  );
};

export default LogoutButton;
