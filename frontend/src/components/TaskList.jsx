import axios from 'axios';

const token = localStorage.getItem('token');

const response = await axios.get('/api/tasks', {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
