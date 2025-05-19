import React, { useState, useEffect } from 'react';
import CreateTask from './components/CreateTask';
import TaskList from './components/TaskList';
import UpdateTask from './components/UpdateTask';
import DeleteTask from './components/DeleteTask';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (!token) {
      window.location.href = '/login';
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    window.location.href = '/login';
  };

  return (
    <div>
      <h1>Task Tracker</h1>
      {token ? (
        <>
          <button onClick={handleLogout}>Logout</button>
          <CreateTask token={token} />
          <TaskList token={token} />
          <UpdateTask token={token} taskId="hardcoded-task-id" />
          <DeleteTask token={token} taskId="hardcoded-task-id" />
        </>
      ) : (
        <div>Please log in to manage tasks.</div>
      )}
    </div>
  );
};

export default App;
