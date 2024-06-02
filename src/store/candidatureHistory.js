import proxy from "@/proxy";

const candidatureHistory = {
  namespaced: true,
  state: () => ({
    data: [],
  }),
  mutations: {
    setHistory: function (state, data) {
      state.data = data;
    },
  },
  actions: {
    getHistory: async function ({ commit },candidatureId) {
      let response = await proxy.getCandidatureHistory(candidatureId);
      console.log('vuex - getHistory',response.data);
      commit("setHistory", response.data);
    },
  },
};

export default candidatureHistory;
