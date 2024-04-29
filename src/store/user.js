import proxy from "@/proxy";
import router from "@/router";

const user = {
  namespaced: true,
  state: () => ({
    token: localStorage.getItem("token") ?? null,
  }),
  mutations: {
    setToken: function (state, token) {
      state.token = token;
      localStorage.setItem("token", token);
    },
    removeToken: function (state) {
      console.log("vuex user - removeUser");
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  actions: {
    login: async function ({ commit }, { email, password }) {
      let response = await proxy.login(email, password);
      let { token } = response.data;
      commit("setToken", token);
      router.push("/home");
    },
  },
};

export default user;
