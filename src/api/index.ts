import Browser from "webextension-polyfill";
import { getLocalStorageByParams } from "@/core/storage/helper";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/',
  timeout: 1000,
  headers: {
    'X-Custom-Header': 'foobar',
  },
});

async function getCsrfToken() {
  const response = await axios.get("http://localhost:8000/api/csrf/");
  return response.data.csrfToken;
}

// function getCookie(name: string) {
//   let cookieValue = null;
//   if (document.cookie && document.cookie !== '') {
//     const cookies = document.cookie.split(';');
//     for (let i = 0; i < cookies.length; i++) {
//       const cookie = cookies[i].trim();
//       if (cookie.startsWith(name + '=')) {
//         cookieValue = cookie.substring(name.length + 1);
//         break;
//       }
//     }
//   }
//   return cookieValue;
// }

axiosInstance.interceptors.request.use(async (config) => {
  const token = await getLocalStorageByParams("token");
  let csrfToken = null;
  try {
    csrfToken = (await Browser.storage.local.get('csrftoken')).csrfToken;
    if (!csrfToken) {
      csrfToken = await getCsrfToken();
      await Browser.storage.local.set({"csrftoken": csrfToken});
      // document.cookie = `csrftoken=${csrfToken};`;
    }
  } catch (e) {
    console.error(e);
  }
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  if (csrfToken) {
    config.headers["X-CSRFTOKEN"] = csrfToken;
  }
  return config;
});

export default axiosInstance;
