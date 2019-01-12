<template>
  <div :class="[$style.wrapper]">
    <template v-if="answers">
      <AnswersListItem
        v-for="(answer, index) in answers"
        :key="answer.id"
        :meta="answer"
        :odd="index % 2 === 0"
      />
      <Pagination
        :page="page"
        :content="answers.length"
      />
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import AnswersListItem from './AnswersListItem'
import Pagination from './Pagination'

export default {
  components: {
    AnswersListItem,
    Pagination
  },
  props: {
    questionid: Number,
    page: Number
  },
  computed: {
    ...mapGetters('Question', [
      'get'
    ]),
    answers () {
      return this.get[this.questionid] ? this.get[this.questionid].data.answers : false
    }
  }
}
</script>

<style module lang="scss">
@import "../styles/const.scss";

</style>
