import Vue from 'vue'
import Router from 'vue-router'
import MainPage from './managers/main'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: MainPage
    }
  ]
})
