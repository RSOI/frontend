import api from '../modules/api'

const state = {
  question: {}
}

const getters = {
  get: state => state.question
}

const actions = {
  request ({ state, commit }, data) {
    if (!state.question[data.id]) {
      commit('addQuestion', data.id)
    }

    api.GET(`question/id${data.id}?page=${data.page || 0}&conp=10`)
      .then(response => {
        commit('store', { id: data.id, response })
      })
  }
}

const mutations = {
  addQuestion (state, id) {
    state.question[id] = {
      data: {
        questions: [],
        counter: 0
      },
      status: false,
      error: false
    }
    state.question = Object.assign({}, state.question)
  },
  store (state, data) {
    const isError = data.response.error !== 'OK'
    state.question[data.id].status = !isError
    state.question[data.id].error = isError ? data.response.error : false
    if (data.response.data) {
      state.question[data.id].data = data.response.data
    }
    state.question = Object.assign({}, state.question)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
