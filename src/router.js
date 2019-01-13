import Vue from 'vue'
import Router from 'vue-router'
import MainPage from './managers/main'
import SignupPage from './managers/signup'
import QuestionPage from './managers/question'
import UserPage from './managers/user'
import NotFound from './managers/404'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: MainPage,
      props: {
        page: 1
      }
    },
    {
      path: '/questions',
      component: MainPage,
      props: route => ({
        page: Number(route.query.page) || 1,
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
      path: '/user/id:id/questions',
      component: UserPage,
      props: route => ({
        page: Number(route.query.page) || 1,
        id: Number(route.params.id),
        torequest: 'questions'
      })
    },
    {
      path: '/user/id:id/answers',
      component: UserPage,
      props: route => ({
        page: Number(route.query.page) || 1,
        id: Number(route.params.id),
        torequest: 'answers'
      })
    },
    {
      path: '/user/id:id',
      component: UserPage,
      props: route => ({
        id: Number(route.params.id),
        page: 1,
        torequest: 'questions'
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
