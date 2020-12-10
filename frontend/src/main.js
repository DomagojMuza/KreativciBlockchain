import Vue from 'vue'
import App from './App.vue'
import router from './router'

import "./plugins";

import error from '@/components/Error.js'
import store from '@/store.js'
Vue.prototype.$store = store
Vue.prototype.$error = error

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
