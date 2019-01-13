<template>
  <div :class="[$style.wrapper]">
    <div :class="[$style.wrapper__content]">
      <template v-if="isListReady">
        <QuestionsListItem
          v-for="question in list"
          :key="question.id"
          :meta="question"
        />
      </template>
      <template v-else-if="listError">
        Something went wrong
      </template>
      <template v-else-if="!list || !list.length">
        <div :class="[$style.nodata]">
          <template v-if="page > 1">
            Кажется, больше вопросов нет...
          </template>
          <template v-else-if="userid">
            Кажется, этот пользователь слишком умный, чтобы задавать вопросы
          </template>
          <NoData />
        </div>
      </template>
      <template v-else>
        preloader
      </template>
      <Pagination
        v-if="list || page > 1"
        :page="page"
        :amount="questions.data.counter"
        :content="list ? list.length : 0"
        :link="link"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import NoData from './NoData'
import QuestionsListItem from './QuestionsListItem'
import Pagination from './Pagination'

export default {
  components: {
    NoData,
    QuestionsListItem,
    Pagination
  },
  props: {
    page: Number,
    userid: Number,
    link: String
  },
  computed: {
    ...mapGetters('QuestionsAll', {
      questions: 'get'
    }),
    ...mapGetters('User', {
      user: 'get'
    }),
    list () {
      if (this.userid) {
        return this.user[this.userid].questions.data.questions
      }
      return this.questions.data.questions
    },
    isListReady () {
      if (this.userid) {
        return this.user[this.userid].questions.status && !this.user[this.userid].questions.error && this.user[this.userid].questions.data.questions
      }
      return this.questions.status && !this.questions.error && this.questions.data.questions.length
    },
    listError () {
      if (this.userid) {
        return this.user[this.userid].questions.error
      }
      return this.questions.error
    }
  }
}
</script>

<style lang="scss" module>
@import "../styles/const.scss";

.wrapper {
  padding: $padding-base;

  &__content {
    max-width: $page-max-width;
    margin: auto;
  }
}

.nodata {
  text-align: center;
}
</style>
