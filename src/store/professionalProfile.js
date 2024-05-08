import proxy from "@/proxy";

const professionalProfile = {
  namespaced: true,
  state: () => ({
   data:[]
  }),
  mutations: {
    setData: function (state,profiles){
      state.data = profiles;
    }
    
  },
  actions: {
    search: async function({commit},params = {}){
      console.log('vuex - action');
      console.log('params = ',params);
      let response = await proxy.getProfessionalProfiles(params);
      commit('setData',response.data);
    }
  },
};

export default professionalProfile;
