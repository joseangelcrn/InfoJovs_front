import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import MainCard from './components/MainCard.vue'
import proxy from './proxy'
import Modal from './components/Modal.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Common from './Utils/Common'
import ModalExtended from './components/ModalExtended.vue'

//axios
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

//Global components
Vue.component('main-card',MainCard);
Vue.component('modal',Modal);
Vue.component('modal-extended',ModalExtended);



//Global classes/variables
Vue.prototype.$proxy = proxy;
Vue.prototype.$common = Common;

//Global CSS
require('@/assets/styles/main.css')


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
