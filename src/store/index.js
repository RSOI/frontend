import Vue from 'vue'
import Vuex from 'vuex'

import Account from './Account'
import QuestionsAll from './QuestionsAll'
import Question from './Question'
import User from './User'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Account,
    QuestionsAll,
    Question,
    User
  }
})
