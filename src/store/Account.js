import api from '../modules/api'

const state = {
  user: {
    id: -1,
    nickname: '',
    email: ''
  },
  status: false,
  error: false
}

const getters = {
  get: state => state.user,
  nickname: state => state.user.nickname,
  id: state => state.user.id,
  loggedin: state => state.user.id !== -1
}

const actions = {

}

const mutations = {
  store (state, response) {

  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
