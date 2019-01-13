import api from '../modules/api'

const state = {
  user: {}
}

const getters = {
  get: state => state.user
}

const actions = {
  requestUser ({ state, commit }, data) {
    if (!state.user[data.id]) {
      commit('addUser', data.id)
    }

    api.GET(`user/id${data.id}`)
      .then(response => {
        commit('storeInfo', { id: data.id, response })
      })
  },
  requestAnswers ({ state, commit }, data) {
    if (!state.user[data.id]) {
      commit('addUser', data.id)
    }
    api.GET(`user/id${data.id}/answers?page=${data.page || 1}&conp=10`)
      .then(response => {
        commit('storeAnswers', { id: data.id, response })
      })
  },
  requestQuestions ({ state, commit }, data) {
    if (!state.user[data.id]) {
      commit('addUser', data.id)
    }
    api.GET(`user/id${data.id}/questions?page=${data.page || 1}&conp=10`)
      .then(response => {
        commit('storeQuestions', { id: data.id, response })
      })
  }
}

const mutations = {
  addUser (state, id) {
    state.user[id] = {
      info: {
        data: {},
        status: false,
        error: false
      },
      questions: {
        data: {
          questions: [],
          counter: 0
        },
        status: false,
        error: false
      },
      answers: {
        data: {
          answers: [],
          counter: 0
        },
        status: false,
        error: false
      }
    }
    state.question = Object.assign({}, state.question)
  },
  storeInfo (state, data) {
    const isError = data.response.error !== 'OK'
    state.user[data.id].info.status = !isError
    state.user[data.id].info.error = isError ? data.response.error : false
    if (data.response.data) {
      state.user[data.id].info.data = data.response.data
    }
    state.user = Object.assign({}, state.user)
  },
  storeAnswers (state, data) {
    const isError = data.response.error !== 'OK'
    state.user[data.id].answers.status = !isError
    state.user[data.id].answers.error = isError ? data.response.error : false
    if (data.response.data) {
      state.user[data.id].answers.data = data.response.data
    }
    state.user = Object.assign({}, state.user)
  },
  storeQuestions (state, data) {
    const isError = data.response.error !== 'OK'
    state.user[data.id].questions.status = !isError
    state.user[data.id].questions.error = isError ? data.response.error : false
    if (data.response.data) {
      state.user[data.id].questions.data = data.response.data
    }
    state.user = Object.assign({}, state.user)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
