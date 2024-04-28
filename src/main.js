import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import MainCard from './components/MainCard.vue'
import proxy from './proxy'

Vue.config.productionTip = false

//Global components
Vue.component('main-card',MainCard);


//Global classes/variables
Vue.prototype.$proxy = proxy;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
