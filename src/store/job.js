import proxy from "@/proxy";

const job = {
  namespaced: true,
  state: () => ({
    data: [],
    pagination:{
      currentPage:1,
      perPage:5,
      lastPage:0,
      totalItems:0
    },
    candidatures:[]
  }),
  mutations: {
    
    //Jobs
    setJobs: function (state, data) {
      state.data = data;
    },
    addJob: function (state, data) {
      state.data = data;
    },
    removeJob: function (state, id) {
      let filteredData = state.data.filter((item) => item.id !== id);
      state.data = filteredData;
    },

    //Candidatures
    setCandidatures : function(state,data){
      state.candidatures = data;
    },
    //Jobs Pagination 
    setPagination: function (state,data){
      state.pagination = data;
    },
    setCurrentPage: function(state,data){
      console.log('seteo de pagina a '+data);
      state.pagination.currentPage = data;
    }
  },
  actions: {
    search: async function ({ commit,state }, filter) {
      console.log('vuex- search actions ');
      console.log('vuex - filter ',filter);
      let response = await proxy.searchJobs({...filter,...state.pagination})
      console.log(response.data);
      commit('setJobs',response.data.jobs);
      commit('setPagination',response.data.pagination);
    },
    myCandidatures: async function ({commit,state}){
      let response = await proxy.myCandidatures();
      commit('setCandidatures',response.data.candidatures);
      commit('setPagination',response.data.pagination);
    }
  },
};

export default job;
