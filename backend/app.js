const API_URL = 'http://localhost:5000/api/tasks';

export const fetchTasks = async (token) => {
  const res = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const createTask = async (taskData, token) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(taskData),
  });
  return res.json();
};

export const updateTask = async (taskId, taskData, token) => {
  const res = await fetch(`${API_URL}/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(taskData),
  });
  return res.json();
};

export const deleteTask = async (taskId, token) => {
  const res = await fetch(`${API_URL}/${taskId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};