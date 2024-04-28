import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import job from './job'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user:user,
    job:job
  }
})
