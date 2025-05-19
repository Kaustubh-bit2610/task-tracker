import React, { useState } from 'react';
import axios from 'axios';

function CreateTask({ token }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Todo');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:5000/api/tasks',
        {
          title,
          description,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage('Task created successfully!');
      setTitle('');
      setDescription('');
      setStatus('Todo');
    } catch (error) {
      const errMsg =
        error.response?.data?.errors?.[0]?.msg ||
        error.response?.data?.message ||
        'Failed to create task';
      setMessage(`Error: ${errMsg}`);
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Create Task</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title: </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Description: </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Status: </label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Todo">Todo</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <button type="submit">Create Task</button>
      </form>
    </div>
  );
}

export default CreateTask;
