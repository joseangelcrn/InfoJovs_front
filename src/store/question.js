import common from "@/Utils/Common";

const question = {
    namespaced: true,
    state: () => ({
        type: "free", // 1 = Free Text || 2 = Options

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
        setType: function (state, type) {
            state.type = type;
        },
        setTitle: function (state, title) {
            state.title = title;
        },
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
        update: function (state, payload) {
            let {index, new_text} = payload;
            state.answerOptions = state.answerOptions.map((item, mapIndex) => {
                if (mapIndex === index) {
                    item.text = new_text;
                }
                return item;
            });
        },
        store: function (state){
            let {type,title,answerOptions} = state;
            state.data.push({type,title,answerOptions})
        },
        remove : function (state,index){
            state.data = state.data.filter((item,filterIndex)=>{
                return filterIndex !== index;
            })
        }

    },
    getters: {
        isEditMode: function (state) {
            let found = state.answerOptions.filter((item) => {
                return item.edit === true;
            });
            console.log('is edit mode = ' + found.length > 0)
            return found.length > 0;
        }
    },

    actions: {
        update: function ({commit}, payload) {
            commit('update', payload);
            commit('setEditMode', -1);
        },
        store: function ({commit}) {
            commit('store');
            commit('closeModal');
        },
        openModal: function ({commit}){
            commit('reset')
            commit('openModal');
        }
    }
};

export default question;
