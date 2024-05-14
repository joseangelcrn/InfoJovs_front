import proxy from "@/proxy";

const candidatureStatus = {
  namespaced: true,
  state: () => ({
    data: [],
  }),
  mutations: {
    setStatuses: function (state, data) {
      state.data= data;
    },
  },
  actions: {
    getAll: async function({commit}){
      let response = await proxy.getAllCandidatureStatuses();
      commit('setStatuses',response.data); 
    }
  }
};

export default candidatureStatus;
