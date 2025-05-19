import React, { useEffect, useState } from 'react';
import { getTasks, createTask, deleteTask, updateTask } from '../api/api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', status: 'Todo' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const checkAuthAndLoad = async () => {
      if (!token) {
        try {
          navigate('/login');
        } catch {}
        return;
      }
      await loadTasks();
    };
    checkAuthAndLoad();
  }, [token, navigate]);

  const loadTasks = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getTasks(token); // <-- fixed here
      setTasks(data);
    } catch (err) {
      setError('Failed to load tasks: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (editingTaskId) {
        await updateTask(token, editingTaskId, form);
      } else {
        await createTask(token, form);
      }
      setForm({ title: '', description: '', status: 'Todo' });
      setEditingTaskId(null);
      await loadTasks();
    } catch (err) {
      setError('Failed to save task: ' + err.message);
    }
  };

  const handleEdit = (task) => {
    setForm({ title: task.title, description: task.description, status: task.status });
    setEditingTaskId(task._id);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this task?');
    if (!confirmed) return;
    setError('');
    try {
      await deleteTask(token, id);
      await loadTasks();
    } catch (err) {
      setError('Failed to delete task: ' + err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>Dashboard</h2>
        <button onClick={handleLogout} style={styles.logoutBtn}>
          Logout
        </button>
      </div>

      <form onSubmit={handleCreateOrUpdate} style={styles.form}>
        <input
          name="title"
          placeholder="Task Title"
          value={form.title}
          onChange={handleChange}
          required
          style={styles.input}
          autoFocus
        />
        <textarea
          name="description"
          placeholder="Task Description"
          value={form.description}
          onChange={handleChange}
          required
          style={styles.textarea}
        />
        <select name="status" value={form.status} onChange={handleChange} style={styles.select}>
          <option>Todo</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
        <button type="submit" style={styles.submitBtn}>
          {editingTaskId ? 'Update Task' : 'Create Task'}
        </button>
      </form>

      {loading && <p>Loading tasks...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={styles.taskList}>
        {tasks.map((task) => (
          <div key={task._id} style={styles.taskCard}>
            <h4>{task.title}</h4>
            <p>{task.description}</p>
            <p>
              <strong>Status:</strong> {task.status}
            </p>
            <div style={styles.taskButtons}>
              <button onClick={() => handleEdit(task)} style={styles.editBtn}>
                Edit
              </button>
              <button onClick={() => handleDelete(task._id)} style={styles.deleteBtn}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    background: '#f9f9f9',
    minHeight: '100vh',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '2rem',
  },
  logoutBtn: {
    padding: '8px 15px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  form: {
    background: '#fff',
    padding: '1rem',
    borderRadius: '10px',
    boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
    marginBottom: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  textarea: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    minHeight: '80px',
  },
  select: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  submitBtn: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  taskList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1rem',
  },
  taskCard: {
    background: '#fff',
    padding: '1rem',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  taskButtons: {
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
  },
  editBtn: {
    padding: '6px 12px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  deleteBtn: {
    padding: '6px 12px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Dashboard;
