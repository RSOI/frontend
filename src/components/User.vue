<template>
  <div :class="[$style.wrapper]">
    <div :class="[$style.wrapper__content]">
      <template v-if="infoReady">
        <div :class="[$style.table, $style.user]">
          <div :class="[$style.table__row]">
            <div :class="[$style.table__cell, $style.avatar]">
              <man v-if="info.data.sex === 0" />
              <girl v-else />
            </div>
            <div :class="[$style.table__cell, $style.info]">
              <div>{{ info.data.nickname }}</div>
              <div :class="[$style.info__stats]">
                <div>
                  <template v-if="info.data.sex">Задала</template>
                  <template v-else>Задал</template>
                  {{ questions ? questions.data.counter : 0 }}
                  {{ questions ? questions.data.counter : 0 | plural('question') }}
                </div>
                <div>
                  <template v-if="info.data.sex">Дала</template>
                  <template v-else>Дал</template>
                  {{ answers ? answers.data.counter : 0 }}
                  {{ answers ? answers.data.counter : 0 | plural('answer') }}
                </div>
                <div>
                  <template v-if="info.data.sex">Набрала</template>
                  <template v-else>Набрал</template>
                  {{ info.data.rating }} {{ info.data.rating | plural('score') }} рейтинга
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-else-if="infoError">
        {{ infoError }}
      </template>
      <template v-else>
        preloader
      </template>
      <template v-if="torequest === 'answers'">
        <AnswersList
          v-if="answersReady"
          :userid="id"
          :page="page"
          :showAuthor="false"
          :showQuestionLink="true"
        />
        <template v-else-if="answersError">
          {{ answersError }}
        </template>
        <template v-else>
          preloader
        </template>
      </template>
      <template v-else>
        <QuestionsList
          v-if="questionsReady"
          :page="page"
          :userid="id"
        />
        <template v-else-if="questionsError">
          {{ questionsError }}
        </template>
        <template v-else>
          preloader
        </template>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import man from '../imgs/man.svg'
import girl from '../imgs/girl.svg'
import star from '../imgs/star.svg'
import AnswersList from './AnswersList'
import QuestionsList from './QuestionsList'

export default {
  props: {
    id: Number,
    torequest: String,
    page: Number
  },
  components: {
    man,
    girl,
    star,
    AnswersList,
    QuestionsList
  },
  computed: {
    ...mapGetters('User', [
      'get'
    ]),
    info () {
      return this.get[this.id] ? this.get[this.id].info : null
    },
    infoReady () {
      return this.get[this.id] && this.get[this.id].info.status && !this.get[this.id].info.error
    },
    infoError () {
      if (!this.get[this.id] || !this.get[this.id].info) {
        return false
      }
      return this.get[this.id].info.error
    },
    answers () {
      return this.get[this.id] ? this.get[this.id].answers : null
    },
    answersReady () {
      return this.get[this.id] && this.get[this.id].answers.status && !this.get[this.id].answers.error
    },
    answersError () {
      if (!this.get[this.id] || !this.get[this.id].answers) {
        return false
      }
      return this.get[this.id].answers.error
    },
    questions () {
      return this.get[this.id] ? this.get[this.id].questions : null
    },
    questionsReady () {
      return this.get[this.id] && this.get[this.id].questions.status && !this.get[this.id].questions.error
    },
    questionsError () {
      if (!this.get[this.id] || !this.get[this.id].questions) {
        return false
      }
      return this.get[this.id].questions.error
    }
  }
}
</script>

<style module lang="scss">
@import "../styles/const.scss";

.wrapper {
  padding: $padding-base;

  &__content {
    max-width: $page-max-width;
    margin: auto;
  }
}

.table {
  display: table;
  margin: auto;

  &__row {
    display: table-row;
  }

  &__cell {
    display: table-cell;
    width: 50%;
    vertical-align: top;
  }
}

.user {
  padding-bottom: $padding-base;
  border-bottom: 1px solid $color-border;
}

.avatar {
  & svg {
    width: $avatar-big * 2;
    height: $avatar-big * 2;
  }
}

.info {
  @include fontH1();

  &__stats {
    @include fontH3();
  }
}
</style>
