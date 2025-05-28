import { getLocalStorageByParams } from "@/core/storage/helper";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/',
  timeout: 1000,
  headers: {
    'X-Custom-Header': 'foobar',
  },
});

axiosInstance.interceptors.request.use(async (config) => {
  const token = await getLocalStorageByParams("token");
  config.headers.Authorization = `Token ${token}`;
  return config;
});

export default axiosInstance;
