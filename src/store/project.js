import { getProjects } from "@/api/projectAPI";

const project = {
  state: {
    projects: [],
    total_page: 0,
    current_page: 0,
  },

  mutations: {
    SET_PROJECTS(state, projects) {
      state.projects = projects;
    },
    SET_TOTAL_PAGE(state, total_page) {
      state.total_page = total_page;
    },
    SET_CURRENT_PAGE(state, currentPage) {
      state.current_page = currentPage;
    },
  },

  actions: {
    async fetchProjects(context, currentPage) {
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
  },
};

export { project };
