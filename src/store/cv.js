import proxy from "@/proxy";
import common from "@/Utils/Common";

const cv = {
    namespaced: true,
    state: () => ({
        data: [],
        modal: { //Modal to edit cv fragments
            show: false,
            type: null, //summary | experience | skill,
            data: null,
        },
        loading:true
    }),
    mutations: {
        setData: function (state, data) {
            state.data = data;
        },
        hideModal: function (state) {
            console.log('vuex- hide modal')
            state.modal.show = false;
        },

        editSummary: function (state) {
            let summary = state.data.summary;

            state.modal = {
                show: true,
                type: 'summary',
                data: common.deepClone(summary),
            }
        },

        createExperience: function(state){
            console.log('cv - vuex create experience')
            state.modal = {
                show: true,
                type: 'experience',
                data: {
                    business:null,
                    description:null,
                    start_date:null,
                    finish_date:null
                },
                aux: {
                    start_date: null,
                    finish_date: null
                },
                menus: {
                    start_date: false,
                    finish_date: false,
                },
            };
        },

        editExperience: function (state, experienceId) {
            let experience = state.data.experiences.find((item) => {
                return item.id === experienceId
            });
            console.log('exp id = ' + experienceId)
            state.modal = {
                show: true,
                type: 'experience',
                data: common.deepClone(experience),
                aux: {
                    start_date: null,
                    finish_date: null
                },
                menus: {
                    start_date: false,
                    finish_date: false,
                },
            };
        },

        editSkill: function (state, skillId) {
            let skill = state.data.skills.find((item) => {
                return item.id === skillId
            });

            state.modal = {
                show: true,
                type: 'skill',
                data: common.deepClone(skill),
            }
        },

        refreshData: function (state,payload) {
            console.log('refresh data ')
            let {type, data} = payload;

            if (type === 'summary') {
                state.data.summary = data;
            } else { //experience | skill
                let key = type + 's'; // experience = experiences | skill = skills
                state.data[key] = state.data[key].map((item) => {
                    if (item.id === data.id) {
                        item = data;
                    }
                    return item;
                })
            }
        },
        pushData: function (state,payload) {

            let {type, data} = payload;

            if (state.modal.type === 'summary') {
                state.data.summary = data;
            } else {
                let key =type + 's'; // experience = experiences | skill = skills
                state.data[key].push(data);
            }

        },

        updateStartDate: function (state, data) {
            state.modal.data.start_date = data;
        },
        updateFinishDate: function (state, data) {
            state.modal.data.finish_date = data;
        },
        resetAuxVars: function (state) {
            state.modal.aux = {
                start_date: null,
                finish_date: null
            }
        },
        setAuxVar: function (state, {key, value}) {
            state.modal.aux[key] = value;
        },
        delete: function (state, {id, type}) {
            state.data[type] = state.data[type].filter((item) => {
                return item.id !== id;
            })
        },
        setLoading: function (state,value){
            state.loading = value;
        }

    },
    actions: {
        load: async function ({commit}, userId = null) {
            let response = await proxy.getCvInfo(userId);
            commit('setData', response.data.cv);
            commit('setLoading',false);
        },
        save: async function ({commit, state}) {
            var dataToBackend = {};
            if (state.modal.type === 'summary'){
                dataToBackend = {
                    summary:state.modal.data,
                    type:state.modal.type
                }
            }else{
                let modalData = state.modal.data;
                modalData.type = state.modal.type;
                dataToBackend = {
                    ...modalData,
                    type:state.modal.type
                };
            }

            let response = await proxy.saveCvComponent(dataToBackend);
            let responseData = response.data;
            if (state.modal.data.id) {
                commit('refreshData',responseData);
            } else {
                commit('pushData',responseData);
            }
            commit('resetAuxVars');
            commit('hideModal');
        },
        delete: async function ({commit}, {id,type}) {

            let response = await proxy.deleteCvComponent({id,type});
            commit('delete', {id,type})
        }
    },
};

export default cv;
