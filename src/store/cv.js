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
            id: null //summary dont need it
        }
    }),
    mutations: {
        setData: function (state, data) {
            state.data = data;
        },
        hideModal:function (state){
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
            }
        },

        refreshData: function (state,payload){
            let {type,id,data} = payload;

            if (type === 'summary'){
                state.data.summary = data;
            }
            else{ //experience | skill
                state.data[type] = state.data[type].map((item)=>{
                    if (item.id === id){
                        item = data;
                    }
                    return item;
                })
            }
        }

    },
    actions: {
        load: async function ({commit}, userId = null) {
            console.log('actions load - cv (user id ) = ' + userId)
            let response = await proxy.getCvInfo(userId);
            console.log('response cv = ', response.data)
            commit('setData', response.data.cv);
        },
        store: async function({commit,state}){
            let {data,id} = state.modal;
            let response = {};
            commit('refreshData',response.data);
        }
    },
};

export default cv;
