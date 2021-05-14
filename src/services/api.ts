import axios from 'axios';

const api = axios.create({
  baseURL: 'https://60955d5ee806f600171166c9.mockapi.io/api/v1/',
});

export default api;
