<template>
  <div :class="[$style.wrapper]">
    <Header />
    <SigninForm v-if="!loggedin" />
    <QuestionsList :page="page" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import Header from '../components/Header'
import SigninForm from '../components/SigninForm'
import QuestionsList from '../components/QuestionsList'

export default {
  components: {
    Header,
    SigninForm,
    QuestionsList
  },
  props: {
    page: Number
  },
  watch: {
    page (page) {
      this.requestQuestions(page)
    }
  },
  computed: {
    ...mapGetters('Account', [
      'loggedin'
    ])
  },
  methods: {
    ...mapActions('QuestionsAll', {
      requestQuestions: 'request'
    }),
    init () {
      this.requestQuestions(this.page)
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
