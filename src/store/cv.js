import proxy from "@/proxy";

const cv = {
  namespaced: true,
  state: () => ({
   data:[]
  }),
  mutations: {
    setData: function (state,data){
      state.data = data;
    }
    
  },
  actions: {
    load: async function({commit},userId = null){
      console.log('actions load - cv (user id ) = '+userId)
      let response = await proxy.getCvInfo(userId);
      console.log('response cv = ',response.data)
      commit('setData',response.data.cv);
    }
  },
};

export default cv;
