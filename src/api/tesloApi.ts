import axios from 'axios';

const testoApi = axios.create({
  baseURL: import.meta.env.VITE_TESLO_API_URL,
});
//TODO: Interceptors

export { testoApi };
