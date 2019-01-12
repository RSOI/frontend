<template>
  <div :class="[$style.wrapper]">
    <Header />
    <Question :id="id" :page="page" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import Header from '../components/Header'
import Question from '../components/Question'

export default {
  components: {
    Header,
    Question
  },
  props: {
    id: Number,
    page: Number
  },
  watch: {
    page () {
      this.init()
    }
  },
  methods: {
    ...mapActions('Question', {
      requestQuestion: 'request'
    }),
    init () {
      this.requestQuestion({ id: this.id, page: this.page })
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
