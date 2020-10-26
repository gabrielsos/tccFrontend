import axios from 'axios';

const api = axios.create({
  baseURL: 'https://tcc-fatec-backend.herokuapp.com/',
});

export default api;
