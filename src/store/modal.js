const modal = {
  namespaced: true,
  state: () => ({
    show: false,
    title: "Info",
    text: "Default text d",
    textBtnYes:"Ok",
    textBtnNot:null,
    type:"info",
    onClickYes:null,
    onClickNot:null
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
      console.log('Manage Modal !!')
      let {
        title = 'Info',
        text='',
        type= 'info',
        onClickYes = ()=>{state.show = false},
        onClickNot = null,
        textBtnYes = 'Yes',
        textBtnNot = null,
      } = config;

        // console.log('title = '+title)
        // console.log('type = '+type)
        // console.log('text = '+text)
        // console.log('textBtnYes = '+textBtnYes)
        // console.log('textBtnNot = '+textBtnNot)
        // console.log('onClickYes = '+onClickYes)
        // console.log('onClickNot = '+onClickNot)

        state.show = true;
        state.title = title;
        state.type = type;
        state.text = text;
        state.textBtnNot = textBtnNot;
        state.textBtnYes = textBtnYes;
        state.onClickYes = onClickYes
        state.onClickNot = onClickNot
    }

  },
  actions: {},
};

export default modal;
