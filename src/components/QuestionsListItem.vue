<template>
  <div :class="[$style.wrapper]">
    <div :class="[$style.header]">
      <router-link
        tag="a"
        :to="`/question/id${meta.id}`"
        :class="[$style.header__link]"
      >{{ meta.title }}</router-link>
      <StarIcon :class="[$style.header__has_best]" v-if="meta.has_best" />
    </div>
    <div :class="[$style.content]">
      {{ meta.content }}
    </div>
    <div :class="[$style.meta]">
      Спросил
      <router-link
        tag="a"
        :to="`/user/id${meta.author_id}`"
        :class="[$style.meta__link]"
      >{{ meta.author_nickname }}</router-link>
      примерно
      <span :class="[$style.time]">{{ meta.created | time }}</span>
    </div>
  </div>
</template>

<script>
import StarIcon from '../imgs/star.svg'

export default {
  components: {
    StarIcon
  },
  props: {
    meta: Object
  }
}
</script>

<style lang="scss" module>
@import "../styles/const.scss";

.wrapper {
  border-bottom: 1px solid $color-border-contrast;
  padding-bottom: $padding-base / 2;
}

.header {
  padding-top: $padding-base / 2;
  @include fontSize5();

  &__link {
    color: $color-link;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  &__has_best {
    float: right;
    width: $icon-size;
    height: $icon-size;
  }
}

.content {
  @include fontSize3();
  padding-bottom: $padding-base / 2;
}

.meta {
  @include fontSize2();
  color: $color-text-meta;

  &__link {
    text-decoration: none;
    color: $color-text;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
