import common from "@/Utils/Common";

const question = {
    namespaced: true,
    state: () => ({
        type: "options", // 1 = Free Text || 2 = Options

        title: '', //question
        answer: '',
        show: true,
        newAnswer: '', //input v-model
        answerOptions: [
            {text: 'Option 1', edit: false},
            {text: 'Option 2', edit: false},
            {text: 'Option 3', edit: false},
            {text: 'Option 4', edit: false},

        ],
        //all questions are store in data ( this will be stored in database)
        // data:[]
        data: [
            {
                "type": "options", "title": "cc",
                "answerOptions": [
                    {"text": "Option 1", "edit": false},
                    {"text": "Option 2", "edit": false},
                    {"text": "Option 3", "edit": false},
                    {"text": "Option 4", "edit": false}
                ]
            }
        ]
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
            state.show = false;
            state.newAnswer = '';
            state.answerOptions = [];
        },
        setEditMode: function (state, index) {
            console.log('set edit mode');
            console.log('index = ' + index)
            state.answerOptions = state.answerOptions.map((item, indexMap) => {
                if (index == indexMap) {
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
            console.log('update !')
            console.log('new text = ', new_text)
            state.answerOptions = state.answerOptions.map((item, mapIndex) => {
                if (mapIndex === index) {
                    item.text = new_text;
                }
                return item;
            });
        },
        storeAsNew: function (state) {
            let {type, title, answerOptions} = state;
            answerOptions = common.pluck(answerOptions,'text')
            state.data.push({type, title, answerOptions});
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
        storeAsNew: function ({commit}, payload) {
            commit('storeAsNew');
            commit('closeModal');
            commit('reset');
        }
    }
};

export default question;
