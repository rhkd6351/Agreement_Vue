import axios from "axios";
import { useCookies } from "vue3-cookies";

const { cookies } = useCookies();

const axiosService = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

function getSubmissions(projectName) {
  return axiosService.get(`/api/projects/${projectName}/submittees`);
}

function getSubmission(submissionName) {
  return axiosService.get(`/api/projects/submittees/${submissionName}`);
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

export { getSubmissions };
