import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5002/api/gremlin',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
