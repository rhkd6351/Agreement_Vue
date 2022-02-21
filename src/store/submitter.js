//user store

const submitter = {
  state: {
    submitter: {
      student_id: "",
      student_name: "",
      date: ""
    }
  },

  mutations: {
    SET_SUBMITTER_WRITE_DATE(state){
      state.submitter.date = new Date();
    },
    SET_SUBMITTER(state, data) {
      state.submitter.student_id = data.student_id;
      state.submitter.student_name = data.student_name;
    },
  },
};

export { submitter };
