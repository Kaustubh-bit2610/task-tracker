import React, { useState, useEffect } from 'react';
import API from '../api/api';  // API helper to make requests

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await API.get('/tasks');  // Get tasks from the backend
        setTasks(res.data);
      } catch (err) {
        console.error('Error fetching tasks:', err);
      }
    };
    
    fetchTasks();
  }, []);  // Empty dependency array to run only once when the component mounts

  return (
    <div>
      <h3>Task List</h3>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task._id}>
            <p>{task.title}</p>
            <p>{task.description}</p>
          </div>
        ))
      ) : (
        <p>No tasks available</p>
      )}
    </div>
  );
};

export default TaskList;
