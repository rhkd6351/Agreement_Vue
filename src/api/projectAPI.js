import axios from "axios";
import { useCookies } from "vue3-cookies";

const { cookies } = useCookies();

const axiosService = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

function getProjects(page) {
  return axiosService.get(`/api/projects?page=${page}`);
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

export { getProjects };
