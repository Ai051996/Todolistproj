import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API calls
export const authAPI = {
  login: async (username, password) => {
    const response = await api.post('/token', new URLSearchParams({
      username,
      password,
    }));
    return response.data;
  },

  register: async (username, password) => {
    const response = await api.post('/register', {
      username,
      password,
    });
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/me');
    return response.data;
  },
};

// Todo API calls
export const todoAPI = {
  getTodos: async () => {
    const response = await api.get('/todos');
    return response.data;
  },

  createTodo: async (title) => {
    const response = await api.post('/todos', { title });
    return response.data;
  },

  updateTodo: async (id, completedOrPayload) => {
    const payload = typeof completedOrPayload === 'object' ? completedOrPayload : { completed: completedOrPayload };
    const response = await api.put(`/todos/${id}`, payload);
    return response.data;
  },

  deleteTodo: async (id) => {
    const response = await api.delete(`/todos/${id}`);
    return response.data;
  },
};

export default api;
