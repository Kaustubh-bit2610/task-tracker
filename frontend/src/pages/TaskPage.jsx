// /src/pages/TaskPage.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TaskPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token'); // clear token
    navigate('/login'); // redirect to login
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Welcome to Task Dashboard</h2>
      <button
        onClick={handleLogout}
        style={{
          padding: '10px 20px',
          backgroundColor: '#dc3545',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '10px',
        }}
      >
        Logout
      </button>

      {/* Add your tasks list, create task, etc. below */}
    </div>
  );
};

export default TaskPage;
