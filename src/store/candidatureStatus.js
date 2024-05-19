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
    refreshStatuses: function(state,payload){
      let {candIds,newStatusId} = payload;

      state.data.map((cand)=>{
        if (candIds.includes(cand.id)) {
          cand.status_id = newStatusId;
        }

        return cand;
      })
    }
  },
  actions: {
    getAll: async function({commit}){
      let response = await proxy.getAllCandidatureStatuses();
      commit('setStatuses',response.data); 
    },
    update: async function ({commit},payload){
      console.log('vuex candidature status - update');
      let {candIds,newStatusId} = payload;
      let response = await proxy.updateCandidature(newStatusId,candIds)
      console.log('response ',response);
      commit('refreshStatuses',payload);
    }
  }
};

export default candidatureStatus;
