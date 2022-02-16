//user store

const submitter = {
  state: {
    submitter: {
      schoolID: "",
      name: "",
    }
  },

  mutations: {
    SET_SUBMITTER(state, data) {
      state.submitter.schoolID = data.schoolID;
      state.submitter.name = data.name;
    },
  },
};

export { submitter };
