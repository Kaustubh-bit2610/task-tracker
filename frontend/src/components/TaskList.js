import React, { useState } from 'react';

function TaskList({ tasks, onUpdateTask, onDeleteTask }) {
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const handleDeleteClick = (taskId) => {
    setConfirmDeleteId(taskId);
  };

  const cancelDelete = () => {
    setConfirmDeleteId(null);
  };

  const confirmDelete = (task) => {
    onDeleteTask(task);
    setConfirmDeleteId(null);
  };

  return (
    <ul style={styles.taskList}>
      {tasks.map(task => (
        <li key={task._id} style={styles.taskItem}>
          <div>
            <h4 style={styles.taskTitle}>{task.title}</h4>
            <p style={styles.taskDescription}>{task.description}</p>
            <p style={styles.taskStatus}>Status: {task.status}</p>
          </div>
          <div style={styles.taskActions}>
            <button onClick={() => onUpdateTask(task)} style={styles.updateButton}>
              Update
            </button>
            
            {confirmDeleteId === task._id ? (
              <>
                <button onClick={() => confirmDelete(task)} style={styles.confirmDeleteButton}>
                  Confirm
                </button>
                <button onClick={cancelDelete} style={styles.cancelDeleteButton}>
                  Cancel
                </button>
              </>
            ) : (
              <button onClick={() => handleDeleteClick(task._id)} style={styles.deleteButton}>
                Delete
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

const styles = {
  taskList: {
    listStyle: 'none',
    padding: 0,
  },
  taskItem: {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskTitle: {
    margin: '0 0 5px 0',
    color: '#333',
    fontSize: '1.2em',
    fontWeight: 'bold',
  },
  taskDescription: {
    color: '#555',
    marginBottom: '8px',
    fontSize: '1em',
  },
  taskStatus: {
    color: '#777',
    fontSize: '0.9em',
  },
  taskActions: {
    display: 'flex',
    gap: '10px',
  },
  updateButton: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '8px 12px',
    cursor: 'pointer',
    fontSize: '0.9em',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '8px 12px',
    cursor: 'pointer',
    fontSize: '0.9em',
  },
  confirmDeleteButton: {
    backgroundColor: '#28a745', // green confirm
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '8px 12px',
    cursor: 'pointer',
    fontSize: '0.9em',
  },
  cancelDeleteButton: {
    backgroundColor: '#6c757d', // gray cancel
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '8px 12px',
    cursor: 'pointer',
    fontSize: '0.9em',
  },
};

export default TaskList;
