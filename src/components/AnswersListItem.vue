<template>
  <div :class="[$style.wrapper, {
    [$style.contrast]: odd
  }]">
    <div :class="[$style.table]">
      <div :class="[$style.table__row]">
        <div :class="[$style.table__cell, $style.content]">
          <router-link
            v-if="showQuestionLink"
            tag="a"
            :to="`/question/id${meta.question_id}`"
            :class="[$style.question__link]"
          >
            перейти к вопросу, чтобы узнать тему обсуждения
          </router-link>
          {{ meta.content }}
        </div>
        <div :class="[$style.table__cell, $style.table__cell_right]">
          <div :class="[$style.best]" v-if="meta.is_best">
            неплохой ответ <star width="20" height="20" />
          </div>
          <div :class="[$style.author]">
            <template  v-if="showAuthor">
              от пользователя
              <router-link
                tag="a"
                :to="`/user/id${meta.author_id}`"
                :class="[$style.author]"
              >
                {{ meta.author_nickname }}
              </router-link>
            </template>
            <div :class="[$style.time]">
              {{ meta.created | time }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import star from '../imgs/star.svg'

export default {
  components: {
    star
  },
  props: {
    meta: Object,
    odd: Boolean,
    index: Number,
    showAuthor: Boolean,
    showQuestionLink: Boolean
  }
}
</script>

<style module lang="scss">
@import "../styles/const.scss";

.wrapper {
  padding: $padding-base;
}

.contrast {
  background: $color-bg-light-more;
}

.table {
  display: table;

  &__row {
    display: table-row;
  }

  &__cell {
    display: table-cell;

    &_right {
      padding-left: $padding-base;
      text-align: right;
    }
  }
}

.content {
  @include fontSize4();
  width: 100%;
}

.best {
  vertical-align: middle;
  white-space: nowrap;
  color: $color-best;
  padding: $padding-base /2 0;

  & svg {
    vertical-align: text-bottom;
  }
}

.author {
  white-space: nowrap;
  color: $color-text-meta;
  @include fontSize2();

  & a {
    color: $color-link;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

.question__link {
  display: block;
  color: $color-link;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

</style>
