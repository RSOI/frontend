import api from '../modules/api'

const state = {
  questions: {
    data: [],
    status: false,
    error: false
  }
}

const getters = {
  get: state => state.questions
}

const actions = {
  request ({ state, commit }, page) {
    if (!page) {
      page = 0
    }
    api.GET(`questions?page=${page}&conp=10`)
      .then(response => {
        commit('store', response)
      })
  },
  flush ({ state, commit }) {
    commit('store', false, [])
  }
}

const mutations = {
  store (state, response) {
    const isError = response.error !== 'OK'
    state.questions.status = !isError
    state.questions.error = isError ? response.error : false
    if (response.data) {
      state.questions.data = response.data.slice()
    }
    state.questions = Object.assign({}, state.questions)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
