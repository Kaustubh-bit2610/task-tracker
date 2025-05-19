import React, { useState } from 'react';
import API from '../api/api'; // API instance that uses Axios

const CreateTask = ({ token }) => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    status: 'Pending'
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await API.post('/tasks', taskData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert('✅ Task created successfully!');
      setTaskData({ title: '', description: '', status: 'Pending' });
      console.log('Task Response:', response.data);
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to create task';
      alert(`❌ ${msg}`);
      console.error('Error:', error.response || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>Create New Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={taskData.title}
          onChange={handleChange}
          placeholder="Task Title"
          required
          disabled={loading}
          style={{ width: '100%', marginBottom: 10, padding: 8 }}
        />
        <textarea
          name="description"
          value={taskData.description}
          onChange={handleChange}
          placeholder="Task Description"
          required
          disabled={loading}
          style={{ width: '100%', marginBottom: 10, padding: 8 }}
          rows={4}
        />
        <select
          name="status"
          value={taskData.status}
          onChange={handleChange}
          disabled={loading}
          style={{ width: '100%', marginBottom: 15, padding: 8 }}
        >
          <option value="Pending">Pending</option>
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button type="submit" disabled={loading} style={{ width: '100%', padding: 10 }}>
          {loading ? 'Creating...' : 'Create Task'}
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
