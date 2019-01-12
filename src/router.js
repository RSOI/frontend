import Vue from 'vue'
import Router from 'vue-router'
import MainPage from './managers/main'
import SignupPage from './managers/signup'
import QuestionPage from './managers/question'
import NotFound from './managers/404'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: MainPage,
      props: {
        page: 0
      }
    },
    {
      path: '/questions',
      component: MainPage,
      props: route => ({
        page: route.query.page - 1 || 0
      })
    },
    {
      path: '/question/id:id',
      component: QuestionPage,
      props: route => ({
        page: Number(route.query.page) || 1,
        id: Number(route.params.id)
      })
    },
    {
      path: '/signup',
      component: SignupPage
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})
