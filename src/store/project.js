import { getProjects, changeState, copyProject } from "@/api/projectAPI";

const project = {
  state: {
    projects: [],
    total_page: 0,
    current_page: 0,
  },

  getters: {
    getCurrentPage(state) {
      return state.current_page;
    },
  },

  mutations: {
    SET_PROJECTS(state, projects) {
      state.projects = [];
      for (let i = 0; i < projects.length; i++) {
        // if (projects[i].state != -1) state.projects.push(projects[i]);
        state.projects.push(projects[i]);
      }
    },
    SET_TOTAL_PAGE(state, total_page) {
      state.total_page = total_page;
    },
    SET_CURRENT_PAGE(state, currentPage) {
      state.current_page = currentPage;
    },

    SET_PROJECT_STATE(state, { projectName, status }) {
      for (let i = 0; i < state.projects.lenght; i++) {
        if (state.projects[i].name == projectName) {
          state.projects[i].state = status;
        }
      }
    },
  },

  actions: {
    async fetchProjects(context, currentPage) {
      if (currentPage == null) currentPage = context.getters.getCurrentPage;
      return new Promise((resolve, reject) => {
        getProjects(currentPage)
          .then((res) => {
            context.commit("SET_PROJECTS", res.data.projects);
            context.commit("SET_TOTAL_PAGE", res.data.total_page);
            context.commit("SET_CURRENT_PAGE", currentPage);
            resolve(res.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    async copyProject(context, projectName) {
      return new Promise((resolve, reject) => {
        copyProject(projectName)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    async changeState(context, { projectName, status }) {
      return new Promise((resolve, reject) => {
        changeState(projectName, status)
          .then((res) => {
            context.commit("SET_PROJECT_STATE", {
              projectName: projectName,
              status: status,
            });
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
};

export { project };
