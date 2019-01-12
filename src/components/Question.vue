<template>
  <div :class="[$style.wrapper]">
    <div :class="[$style.wrapper__content]">
      <template v-if="ready">
        <div :class="[$style.question__title]">
          {{ meta.question.title }}
        </div>
        <div :class="[$style.table, $style.question]">
          <div :class="[$style.table__row]">
            <div :class="[$style.question__content]">
              {{ meta.question.content }}
            </div>
            <div :class="[$style.table__cell]">
              <div :class="[$style.question__meta]">
                <div :class="[$style.table]">
                  <div :class="[$style.table__row]">
                    <div :class="[$style.question__meta_avatar]">
                      <man v-if="meta.author.sex === 0" />
                      <girl v-else />
                    </div>
                    <div :class="[$style.question__meta_author]">
                      <router-link
                        tag="a"
                        :to="`/user/id${meta.author_id}`"
                        :class="[$style.question__meta_nickname]"
                      >
                        {{ meta.author.nickname }}
                      </router-link>
                      <div :class="[$style.question__meta_rating]">
                        <star height="15" width="15" />
                        {{ meta.author.rating }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AnswersList :questionid="meta.question.id" :page="page" />
      </template>
      <template v-else-if="error">
        {{ meta.error }}
      </template>
      <template v-else>
        preloader
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import man from '../imgs/man.svg'
import girl from '../imgs/girl.svg'
import star from '../imgs/star.svg'

import AnswersList from '../components/AnswersList'

export default {
  props: {
    page: Number,
    id: Number
  },
  components: {
    AnswersList,
    man,
    girl,
    star
  },
  computed: {
    ...mapGetters('Question', [
      'get'
    ]),
    meta () {
      return this.get[this.id] ? this.get[this.id].data : null
    },
    ready () {
      return this.get[this.id] && this.get[this.id].status && !this.get[this.id].error
    },
    error () {
      return this.get[this.id] && this.get[this.id].error
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

  &__row {
    display: table-row;
  }

  &__cell {
    display: table-cell;
  }
}

.question {
  border-bottom: 1px solid $color-border;
  padding: $padding-base 0;
  
  &__title {
    @include fontSize5();
    padding-bottom: $padding-base / 2;
    border-bottom: 1px solid $color-border;
  }

  &__content {
    display: table-cell;
    vertical-align: top;
    width: 100%;
  }

  &__meta {
    vertical-align: top;
    padding: $padding-base;
    background: $color-bg-light;
    white-space: nowrap;

    &_author {
      display: table-cell;
      vertical-align: top;
      @include fontSize2();
    }

    &_nickname {
      display: block;
      text-decoration: none;
      color: $color-text;

      &:hover {
        text-decoration: underline;
      }
    }

    &_rating {
      & svg {
        vertical-align: top;
      }
    }

    &_avatar {
      display: table-cell;
      vertical-align: middle;

      & svg {
        width: $avatar-small;
        height: $avatar-small;
        padding: 0 $padding-base / 2;
      }
    }
  }
}
</style>
