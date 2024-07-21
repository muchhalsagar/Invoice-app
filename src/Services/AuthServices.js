import axios from 'axios';

const API_URL = 'http://localhost:5000/api/admin/login';

export const login = async (username, password) => {
  try {
    const response = await axios.post(API_URL, { username, password });
    if (response.status === 200 && response.data.token) {
      localStorage.setItem('adminToken', response.data.token);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const getAuthHeader = () => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    return { headers: { Authorization: token } };
  }
  return {};
};