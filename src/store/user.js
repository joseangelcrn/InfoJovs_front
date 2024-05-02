import proxy from "@/proxy";
import router from "@/router";

const user = {
  namespaced: true,
  state: () => ({
    token: localStorage.getItem("token") ?? null,
    data: null,
    roles:[]
  }),
  mutations: {
    setToken: function (state, token) {
      state.token = token;
      localStorage.setItem("token", token);
    },
    setUser: function (state, data) {
      state.data = data;
    },
    setRoles:function(state,data){
      state.roles = data;
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
      // router.push("/home");
    },
    info: async function ({ state, commit }) {
      let response = await proxy.userInfo(state.token);
      let user = response.data.user;
      let roles = response.data.roles;
      commit("setUser", user);
      commit("setRoles", roles);
    },
    logout: async function ({commit}){
      let response = await proxy.logout();
      commit('setUser',null);
      commit('removeToken');
    }
  },
};

export default user;
