import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'},
});

export default axiosInstance;
