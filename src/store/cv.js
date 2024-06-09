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
        }
    }),
    mutations: {
        setData: function (state, data) {
            state.data = data;
        },
        hideModal:function (state){
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


        editExperience: function (state,experienceId){
            let experience = state.data.experiences.find((item)=>{
                return item.id === experienceId
            });
            console.log('exp id = '+ experienceId)
            state.modal = {
                show: true,
                type: 'experience',
                data: common.deepClone(experience),
                aux:{
                    start_date:null,
                    finish_date:null
                },
                menus:{
                    start_date:false,
                    finish_date:false,
                },
            }
        },

        editSkill: function (state,skillId){
            let skill = state.data.skills.find((item)=>{
                return item.id === skillId
            });

            state.modal = {
                show: true,
                type: 'skill',
                data: common.deepClone(skill),
            }
        },

        refreshData: function (state){
            console.log('refresh data ')
            let {type,data} = state.modal;

            if (type === 'summary'){
                state.data.summary = data;
            }
            else{ //experience | skill
                let key = type+'s'; // experience = experiences | skill = skills
                state.data[key] = state.data[key].map((item)=>{
                    if (item.id === data.id){
                        item = data;
                    }
                    return item;
                })
            }
        },
        pushData: function(state){
            let key = type+'s'; // experience = experiences | skill = skills
            state.data[key].push(state.modal.data);
        },

        updateStartDate: function(state,data){
            state.modal.data.start_date = data;
        },
        updateFinishDate: function(state,data){
            state.modal.data.finish_date = data;
        },
        resetAuxVars:function (state){
            state.modal.aux = {
                start_date:null,
                finish_date:null
            }
        },
        setAuxVar: function(state, {key,value}){
            state.modal.aux[key] = value;
        }

    },
    actions: {
        load: async function ({commit}, userId = null) {
            console.log('actions load - cv (user id ) = ' + userId)
            let response = await proxy.getCvInfo(userId);
            console.log('response cv = ', response.data)
            commit('setData', response.data.cv);
        },
        save: async function({commit,state}){
            let {data} = state.modal;
            let response = {};
            if (data.id){
                commit('refreshData');
            }
            else{
                commit('pushData');
            }
            commit('resetAuxVars');
            commit('hideModal');
        },
    },
};

export default cv;
