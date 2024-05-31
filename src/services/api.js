import axios from 'axios';

const api = axios.create({
	baseURL: 'https://api-usuarios-seven.vercel.app',
});

export default api;
