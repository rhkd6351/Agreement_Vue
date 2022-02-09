//user store

const user = {
  state: {
    user: {
      id: "",
      password: "*",
      name: "",
    },
    token: "",
  },

  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setUser(state, data) {
      state.user.id = data.id;
      state.user.password = data.password;
      state.user.name = data.name;
    },
  },
};

export { user };
