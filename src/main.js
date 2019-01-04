import Vue from 'vue'
import router from './router'
import App from './App'

const appElement = document.body.querySelector('#app')
window.vueApp = new Vue({
  el: appElement,
  components: { App },
  template: '<App />',
  router
})
