import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import MainCard from './components/MainCard.vue'

Vue.config.productionTip = false

Vue.component('main-card',MainCard)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
