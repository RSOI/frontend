import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App'

import filterTime from './filters/time'
import VeeValidate from 'vee-validate'

Vue.filter('time', filterTime)

Vue.use(VeeValidate, {
  inject: false,
  validator: 'new',
  locale: 'ru'
})

const appElement = document.body.querySelector('#app')
window.vueApp = new Vue({
  el: appElement,
  components: { App },
  template: '<App />',
  router,
  store
})
