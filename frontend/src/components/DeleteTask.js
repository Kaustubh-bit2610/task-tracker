import React, { useState } from 'react';

const DeleteTask = ({ token, task, onTaskDeleted, onClose }) => {
  const [loading, setLoading] = useState(false);

  const handleConfirmDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${task._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (response.ok) {
        onTaskDeleted(task._id); // Update UI immediately
        onClose(); // Close modal only after success
      } else {
        alert(result.message || 'Failed to delete task');
      }
    } catch (err) {
      alert('Error deleting task: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="deleteTaskTitle">
      <div style={styles.modal}>
        <h3 id="deleteTaskTitle">Confirm Deletion</h3>
        <p>Are you sure you want to delete this task?</p>
        <p><strong>{task.title}</strong></p>
        <div style={styles.buttonGroup}>
          <button
            onClick={handleConfirmDelete}
            style={{ ...styles.confirm, ...(loading && styles.disabled) }}
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Yes, Delete'}
          </button>
          <button
            onClick={onClose}
            style={{ ...styles.cancel, ...(loading && styles.disabled) }}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

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
    padding: 25,
    borderRadius: 10,
    boxShadow: '0px 4px 20px rgba(0,0,0,0.25)',
    minWidth: '320px',
    maxWidth: '90%',
    textAlign: 'center',
  },
  buttonGroup: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'space-around',
    gap: 15,
  },
  confirm: {
    backgroundColor: '#dc3545',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '1em',
  },
  cancel: {
    backgroundColor: '#6c757d',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '1em',
  },
  disabled: {
    cursor: 'not-allowed',
    opacity: 0.6,
  },
};

export default DeleteTask;
