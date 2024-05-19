import proxy from "@/proxy";

const candidature = {
  namespaced: true,
  state: () => ({
    data: [],
    pagination: {
      currentPage: 1,
      perPage: 5,
      lastPage: 0,
      totalItems: 0,
    },
    selectedItems:[]
  }),
  mutations: {
    setCandidatures: function (state, data) {
      state.data = data;
    },
    setPagination: function (state, data) {
      state.pagination = data;
    },
    setCurrentPage: function (state, data) {
      state.pagination.currentPage = data;
    },
    refresh: function (state, payload) {
      console.log('commit - refresh..');
      let { candIds, newStatus } = payload;
      console.log('payload - cand ids = ',candIds);
      console.log('payload - new status id = ',newStatus);
      state.data = state.data.map((cand) => {
        if (candIds.includes(cand.id)) {
          console.log('found cand !');
          cand.status = newStatus;
        }

        return cand;
      });
    },
    deselectAll: function(state){
      state.selectedItems = [];
    }
  },
  actions: {
    myCandidatures: async function ({ commit, state }) {
      let response = await proxy.myCandidatures(state.pagination);
      commit("setCandidatures", response.data.candidatures);
      commit("setPagination", response.data.pagination);
    },
    getByJobId: async function ({ commit }, jobId) {
      let response = await proxy.infoCandidature(jobId);
      commit("setCandidatures", response.data.candidatures);
    },
    update: async function ({ commit }, payload) {
      console.log("vuex candidature  - update");
      let { candIds, newStatusId } = payload;
      let response = await proxy.updateCandidature(newStatusId, candIds);
      console.log('response ',response);
      commit("refresh", {candIds,newStatus:response.data.updated_data.new_status});
    },
  },
};

export default candidature;
