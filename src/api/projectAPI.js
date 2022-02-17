import axios from "axios";
import { useCookies } from "vue3-cookies";

const { cookies } = useCookies();

const axiosService = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

function getProjects(page) {
  return axiosService.get(`/api/projects?page=${page}`);
}

function postProject(file) {
  let formData = new FormData();
  formData.append("file_pdf", file);
  return axiosService.post("/api/projects", formData);
}

function changeState(projectName, state) {
  return axiosService.put(`/api/projects/${projectName}/state?state=${state}`);
}

function changeTitle(projectName, title) {
  return axiosService.put(`/api/projects/${projectName}?title=${title}`);
}

function getSubmitteeProject(projectName) {
  return axiosService.get(`/api/submittees/projects/${projectName}`);
}

function getProject(projectName) {
  return axiosService.get(`/api/projects/${projectName}`);
}

function saveObjects(projectName, objects) {
  return axiosService.post(`/api/projects/${projectName}/objects`, {
    project_object_texts: objects.text_objects,
    project_object_checkboxes: objects.checkbox_objects,
    project_object_signs: objects.sign_objects,
  });
}

function copyProject(projectName) {
  return axiosService.post(`/api/projects/${projectName}/copy`);
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

export {
  getProjects,
  postProject,
  changeState,
  getProject,
  saveObjects,
  changeTitle,
  getSubmitteeProject,
  copyProject,
};
