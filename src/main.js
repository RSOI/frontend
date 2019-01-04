import Vue from 'vue'
import App from './App'

const appElement = document.body.querySelector('#app')
console.log('???')

window.vueApp = new Vue({
  el: appElement,
  components: { App },
  template: '<App />'
})
