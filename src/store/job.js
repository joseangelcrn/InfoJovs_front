import proxy from "@/proxy";

const job = {
  namespaced: true,
  state: () => ({
    data: [],
    pagination: {
      currentPage: 1,
      perPage: 5,
      lastPage: 0,
      totalItems: 0,
    },
    total:0,
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
    setAlreadyRegistered: function(state,isRegistered){
      state.data.alreadyRegistered = isRegistered;
    },
    setActive: function(state,isActive){
      state.data.active = isActive;
    },
    //Candidatures
    // setCandidatures: function (state, data) {
    //   state.candidatures = data;
    // },
    //Jobs Pagination
    setPagination: function (state, data) {
      state.pagination = data;
    },
    setCurrentPage: function (state, data) {
      console.log("seteo de pagina a " + data);
      state.pagination.currentPage = data;
    },
    resetPagination: function(state){
      state.pagination =  {
        currentPage: 1,
        perPage: 5,
        lastPage: 0,
        totalItems: 0,
      };
    }
  },
  actions: {
    search: async function ({ commit, state }, filter) {
      console.log("vuex- search actions ");
      console.log("vuex - filter ", filter);
      let response = await proxy.searchJobs({ ...filter, ...state.pagination });
      console.log(response.data);
      commit("setJobs", response.data.jobs);
      commit("setPagination", response.data.pagination);
    },
    // myCandidatures: async function ({ commit, state }) {
    //   let response = await proxy.myCandidatures(state.pagination);
    //   commit("setCandidatures", response.data.candidatures);
    //   commit("setPagination", response.data.pagination);
    // },
    getJobById: async function ({ commit }, id) {
      let response = await proxy.getJobById(id);
      let job = response.data.job;
      job.alreadyRegistered = response.data.alreadyRegistered;
      commit("setJobs", job);
    },
    // infoCandidature: async function ({ commit, state }, jobId = null) {
    //   if (!jobId) {
    //     jobId = state.data.id;
    //   }
    //   let response = await proxy.infoCandidature(jobId);
    //   commit('setCandidatures',response.data.candidatures)
    // },
    updateActiveValue: async function ({state}){
      let {id,active} = state.data;
      return await proxy.updateJobActiveValue({id,active});
    }
  },
};

export default job;
