const modal = {
  namespaced: true,
  state: () => ({
    show: false,
    title: "Default title",
    text: "Default text d",
    textBtnYes:"Ok",
    type:"info",
    onClickYes:()=>{ console.log('default on click yes !');},
    textBtnNot:null,
    onClickNot:()=>{console.log('default on click Not !')}
  }),
  mutations: {
    show: function (state) {
      state.show = true;
    },
    hide: function (state) {
      state.show = false;
    },
    setTitle: function (state, data) {
      state.title = data;
    },
    setText: function (state, data) {
      state.text = data;
    },
    setOnClickYes: function (state, fn) {
      state.onClickYes = fn;
    },
    setOnClickNot: function (state, fn) {
      state.onClickNot = fn;
    },

    manageModal: function (state,config){
      state.title = config.title;
      state.text = config.text;
      state.onClickYes = config.onClickYes;
      state.onClickNot = config.onClickNot;
      state.show = true;

      state.type = null;
      if (config.type) {
        state.type = config.type;        
      }
    }
    
  },
  actions: {},
};

export default modal;
