import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import job from './job'
import modal from './modal'
import general from './general'
import professionalProfile from './professionalProfile'
import candidatureStatus from './candidatureStatus'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user:user,
    job:job,
    modal:modal,
    general:general,
    professionalProfile:professionalProfile,
    candidatureStatus:candidatureStatus
  }
})
