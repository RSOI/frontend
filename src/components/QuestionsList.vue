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
      <template v-else-if="!list.length">
        <div :class="[$style.nodata]">
          Кажется, больше вопросов нет...
          <NoData />
        </div>
      </template>
      <template v-else>
        preloader
      </template>
      <Pagination
        :page="page + 1"
        :content="list.length"
        link="/questions"
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
    page: Number
  },
  computed: {
    ...mapGetters('QuestionsAll', {
      questions: 'get'
    }),
    list () {
      return this.questions.data
    },
    isListReady () {
      return this.questions.status && !this.questions.error && this.questions.data.length
    },
    listError () {
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
