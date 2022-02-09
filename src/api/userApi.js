import axios from "axios";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

const axiosService = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    // Authorization: `Bearer ${cookies.get("token")}`,
  },
});

function getAutenticate(id, password) {
  return axiosService.post("/api/user/authentication", {
    id: id,
    password: password,
  });
}

function getUserInfo() {
  return axiosService.get("/api/user");
}

axiosService.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${cookies.get("token")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { getAutenticate, getUserInfo };
