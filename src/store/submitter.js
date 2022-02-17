//user store

const submitter = {
  state: {
    submitter: {
      school_id: "",
      name: "",
    }
  },

  mutations: {
    SET_SUBMITTER(state, data) {
      state.submitter.school_id = data.school_id;
      state.submitter.name = data.name;
    },
  },
};

export { submitter };
