import common from "@/Utils/Common";

const question = {
    namespaced: true,
    state: () => ({
        type: "free", // 1 = Free Text (free) || 2 = Options (options)
        readOnly:false, //Global read only
        editingIndex:-1, //Flag to know if we are creating or updating
        title: '', //question
        answer: '',
        show: false,
        newAnswer: '', //input v-model
        answerOptions: [
            {text: 'Option 1', edit: false},
            {text: 'Option 2', edit: false},
            {text: 'Option 3', edit: false},
            {text: 'Option 4', edit: false},

        ],
        //all questions are store in data ( this will be stored in database)
        data:[]
        // data: [
        //     {
        //         "type": "options", "title": "cc",
        //         "answerOptions": [
        //             {"text": "Option 1", "edit": false},
        //             {"text": "Option 2", "edit": false},
        //             {"text": "Option 3", "edit": false},
        //             {"text": "Option 4", "edit": false}
        //         ]
        //     }
        // ]
    }),
    mutations: {
        addAnswer: function (state) {
            let objAnswer = {text: state.newAnswer, edit: false};
            state.answerOptions.push(objAnswer);
            state.newAnswer = '';
        },

        reset: function (state) {
            state.type = 'free';
            state.title = '';
            state.answer = '';
            state.newAnswer = '';
            state.answerOptions = [];
            state.editingIndex = -1;
        },
        setEditMode: function (state, index) {
            console.log('set edit mode');
            console.log('index = ' + index)
            state.answerOptions = state.answerOptions.map((item, indexMap) => {
                if (index === indexMap) {
                    item.edit = true;
                } else {
                    item.edit = false;
                }
                return item;
            });
        },
        openModal: function (state) {
            console.log('open questions modal');
            state.show = true;
        },
        closeModal: function (state) {
            console.log('close questions modal');
            state.show = false;
        },
        //Update answer options if question type is  'options'
        updateAnswerOption: function (state, payload) {
            let {index, new_text} = payload;

            // let cloneAnswerOptions =JSON.parse(JSON.stringify(state.answerOptions));
            let cloneAnswerOptions =common.deepClone(state.answerOptions);
            console.log('debug here')
            let updatedAnswerOptions = cloneAnswerOptions.map((item, mapIndex) => {
                if (mapIndex === index) {
                    item.text = new_text;
                }
                return item;
            });
            state.answerOptions = updatedAnswerOptions;

        },
        setData: function (state,data){
          state.data = data ?? [];
        },
        //Store and update questions
        store: function (state){
            let {type,title,answerOptions} = state;
            if (state.editingIndex !== -1){
                console.log('updating question')
                //update existing one
                state.data = state.data.map((item,index)=>{
                    if (index === state.editingIndex){
                        console.log('type = '+type)
                        item.type = type;
                        item.title = title;
                        item.answerOptions = type === 'options' ? answerOptions : [];
                        console.log('so... answer option = ',item.answerOptions)
                    }
                    return item;
                })
            }else{
                //Create new one
                state.data.push({type,title,answerOptions})
            }
        },
        remove : function (state,index){
            state.data = state.data.filter((item,filterIndex)=>{
                return filterIndex !== index;
            })
        },
        //Set selected question as current editing element (form)
        edit: function (state,index){
            console.log('ediiiit')
            let question = state.data.find((question,findIndex)=>{
                return findIndex === index;
            });
            let {type,title,answerOptions} = question;
            state.title = title;
            state.type = type;
            state.answerOptions = answerOptions;
            state.editingIndex = index;
        },
        //For employees...
        addValueField:function(state){
            state.data = state.data.map((question)=>{
                question.value = null;
                return question;
            })
        },
        setReadOnly: function (state,data){
            state.readOnly = data;
}

    },
    getters: {
        isEditMode: function (state) {
            if (typeof  state.answerOptions === 'undefined'){
                state.answerOptions = [];
            }
            let found = state.answerOptions.filter((item) => {
                return item.edit === true;
            });
            console.log('is edit mode = ' + found.length > 0)
            return found.length > 0;
        }
    },

    actions: {
        updateAnswerOption: function ({commit}, payload) {
            commit('updateAnswerOption', payload);
            commit('setEditMode', -1);
        },
        store: function ({commit}) {
            commit('store');
            commit('closeModal');
        },
        openModal: function ({commit},index = null){
            commit('reset')
            //prevent get events as 'index'
            if (!isNaN(index)){
                //Loading data to edit question
                commit('edit',index);
            }

            commit('openModal');

        }
    }
};

export default question;
