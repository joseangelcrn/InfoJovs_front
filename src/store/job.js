const job = {
  namespaced: true,
  state: () => ({
    data: [],
  }),
  mutations: {
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
  },
  actions: {},
};

export default job;
