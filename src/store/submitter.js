//user store

const submitter = {
  state: {
    submitter: {
      school_id: "",
      name: "",
      date: ""
    }
  },

  mutations: {
    SET_SUBMITTER_WRITE_DATE(){
      
    },
    SET_SUBMITTER(state, data) {
      state.submitter.school_id = data.school_id;
      state.submitter.name = data.name;
    },
  },
};

export { submitter };
