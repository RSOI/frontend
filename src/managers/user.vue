<template>
  <div :class="[$style.wrapper]">
    <Header />
    <User :id="id" :torequest="torequest" :page="page" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import Header from '../components/Header'
import User from '../components/User'

export default {
  components: {
    Header,
    User
  },
  props: {
    id: Number,
    page: Number,
    torequest: String
  },
  watch: {
    page () {
      this.rquestAdditional()
    }
  },
  methods: {
    ...mapActions('User', [
      'requestUser',
      'requestAnswers',
      'requestQuestions'
    ]),
    rquestAdditional () {
      if (this.torequest === 'answers') {
        this.requestAnswers({ id: this.id, page: this.page })
      }
    },
    init () {
      this.requestUser({ id: this.id })
      this.requestAnswers({ id: this.id, page: this.page })
      this.requestQuestions({ id: this.id, page: this.page })
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style module lang="scss">
@import "../styles/const.scss";

.wrapper {

}
</style>
