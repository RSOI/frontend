<template>
  <div :class="[$style.wrapper]">
    <template v-if="answers">
      <AnswersListItem
        v-for="(answer, index) in answers"
        :key="answer.id"
        :meta="answer"
        :odd="index % 2 === 0"
        :showAuthor="showAuthor"
        :showQuestionLink="showQuestionLink"
      />
      <Pagination
        :page="page"
        :amount="amount"
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
    userid: Number,
    page: Number,
    showAuthor: {
      default: true
    },
    showQuestionLink: {
      default: false
    }
  },
  computed: {
    ...mapGetters('Question', {
      getQuestion: 'get'
    }),
    ...mapGetters('User', {
      getUser: 'get'
    }),
    answers () {
      if (typeof this.questionid !== 'undefined') {
        return this.getQuestion[this.questionid] ? this.getQuestion[this.questionid].data.answers.answers : false
      } else {
        return this.getUser[this.userid] ? this.getUser[this.userid].answers.data.answers : false
      }
    },
    amount () {
      if (typeof this.questionid !== 'undefined') {
        return this.getQuestion[this.questionid] ? this.getQuestion[this.questionid].data.answers.counter : 0
      } else {
        return this.getUser[this.userid] ? this.getUser[this.userid].answers.data.counter : 0
      }
    }
  }
}
</script>

<style module lang="scss">
@import "../styles/const.scss";

</style>
