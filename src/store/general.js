const general = {
  namespaced: true,
  state: () => ({
    title: '',
  }),
  mutations: {
    setTitle: function (state, data) {
      state.title = data;
    },
  },
};

export default general;
