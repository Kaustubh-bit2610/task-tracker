const BASE_URL = 'http://localhost:5000/api';

// Utility to handle fetch responses
const handleResponse = async (res) => {
  const contentType = res.headers.get('content-type');
  if (!res.ok) {
    let errorMsg = 'An error occurred';
    if (contentType && contentType.includes('application/json')) {
      const errorData = await res.json();
      errorMsg = errorData.message || JSON.stringify(errorData);
    } else {
      errorMsg = await res.text();
    }
    throw new Error(errorMsg);
  }

  if (contentType && contentType.includes('application/json')) {
    return await res.json();
  }
  return null;
};

// Public APIs
export const registerUser = async (userData) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return handleResponse(res);
};

export const loginUser = async (userData) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return handleResponse(res);
};

// Private APIs (require token)
const getAuthHeaders = (token, includeContentType = false) => {
  if (!token) throw new Error('Token is required');
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  if (includeContentType) headers['Content-Type'] = 'application/json';
  return headers;
};

export const getTasks = async (token) => {
  const res = await fetch(`${BASE_URL}/tasks`, {
    headers: getAuthHeaders(token),
  });
  return handleResponse(res);
};

export const createTask = async (token, taskData) => {
  const res = await fetch(`${BASE_URL}/tasks`, {
    method: 'POST',
    headers: getAuthHeaders(token, true),
    body: JSON.stringify(taskData),
  });
  return handleResponse(res);
};

export const updateTask = async (token, taskId, taskData) => {
  const res = await fetch(`${BASE_URL}/tasks/${taskId}`, {
    method: 'PUT',
    headers: getAuthHeaders(token, true),
    body: JSON.stringify(taskData),
  });
  return handleResponse(res);
};

export const deleteTask = async (token, taskId) => {
  const res = await fetch(`${BASE_URL}/tasks/${taskId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(token),
  });
  return handleResponse(res);
};
