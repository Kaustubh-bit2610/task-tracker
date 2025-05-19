import React, { useState, useEffect } from 'react';
import { updateTask } from '../api/api'; // Adjust path if needed

function UpdateTask({ token, task, onTaskUpdated, onClose }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const updatedTaskData = { title, description, status };
      const updatedTask = await updateTask(token, task._id, updatedTaskData);
      onTaskUpdated(updatedTask);
      onClose();
    } catch (err) {
      console.error('Update Task Error:', err);
      setError(err.message || 'Failed to update task.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="updateTaskTitle">
      <div style={styles.modal}>
        <h3 id="updateTaskTitle" style={styles.modalHeading}>Update Task</h3>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="title" style={styles.modalLabel}>Title:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={styles.modalInput}
            disabled={loading}
            autoFocus
          />

          <label htmlFor="description" style={styles.modalLabel}>Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={styles.modalTextarea}
            disabled={loading}
          />

          <label htmlFor="status" style={styles.modalLabel}>Status:</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={styles.modalSelect}
            disabled={loading}
          >
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <div style={styles.modalButtonContainer}>
            <button
              type="submit"
              disabled={loading}
              style={{ ...styles.modalButton, ...styles.modalUpdateButton, ...(loading && styles.disabled) }}
            >
              {loading ? 'Updating...' : 'Update'}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              style={{ ...styles.modalButton, ...styles.modalCancelButton, ...(loading && styles.disabled) }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
    maxWidth: '500px',
    width: '90%',
    boxSizing: 'border-box',
  },
  modalHeading: {
    color: '#333',
    marginBottom: '25px',
    textAlign: 'center',
    fontSize: '2em',
    fontWeight: 'bold',
  },
  modalLabel: {
    display: 'block',
    marginBottom: '8px',
    color: '#555',
    fontWeight: 'bold',
    fontSize: '1.1em',
  },
  modalInput: {
    width: '100%',
    padding: '12px 15px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '1.1em',
    marginBottom: '20px',
    boxSizing: 'border-box',
  },
  modalTextarea: {
    width: '100%',
    padding: '12px 15px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '1.1em',
    minHeight: '120px',
    marginBottom: '20px',
    boxSizing: 'border-box',
    resize: 'vertical',
  },
  modalSelect: {
    width: '100%',
    padding: '12px 15px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '1.1em',
    marginBottom: '20px',
    boxSizing: 'border-box',
  },
  modalButtonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '15px',
    marginTop: '10px',
  },
  modalButton: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.1em',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
    userSelect: 'none',
  },
  modalUpdateButton: {
    backgroundColor: '#28a745',
  },
  modalCancelButton: {
    backgroundColor: '#6c757d',
  },
  disabled: {
    cursor: 'not-allowed',
    opacity: 0.6,
  },
  error: {
    color: 'red',
    marginBottom: '15px',
    textAlign: 'center',
  },
};

export default UpdateTask;
