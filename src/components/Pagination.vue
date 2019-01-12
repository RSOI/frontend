<template>
  <div :class="[$style.wrapper]">
    <router-link tag="a" :to="prevRoute" :class="[
      $style.btn,
      {
        [$style.disabled]: !prev
      }
    ]">
      Назад
    </router-link>
    <div :class="[$style.page]">{{ page }}</div>
    <router-link tag="a" :to="nextRoute" :class="[
      $style.btn,
      {
        [$style.disabled]: !next
      }
    ]">
      Вперед
    </router-link>
    <div v-if="!next" :class="[$style.nomore]">
      Вы достигли дна. Дальше ничего не будет.
    </div>
  </div>
</template>

<script>
export default {
  props: {
    page: Number,
    content: Number,
    link: String
  },
  computed: {
    prev () {
      return this.page > 1
    },
    next () {
      return this.content >= 10 || this.page < 1
    },
    nextRoute () {
      return this.updateRoute(`page=${this.page + 1}`)
    },
    prevRoute () {
      return this.updateRoute(`page=${this.page - 1}`)
    }
  },
  methods: {
    updateRoute (replacer) {
      const path = this.link || window.location.pathname
      let search = window.location.search
      if (search) {
        const currentPage = search.match(/page=(\d+)/)
        if (currentPage) {
          search = search.replace(/page=(\d+)/, replacer)
        } else {
          search += `&${replacer}`
        }
      }

      return `${path}${search || '?' + replacer}`
    }
  }
}
</script>

<style module lang="scss" >
@import "../styles/const.scss";

.wrapper {
  margin-top: $margin-base;
}

.btn {
  display: inline-block;
  padding: $padding-base / 2 $padding-base;
  border: 1px solid $color-btn-default;
  color: $color-btn-default;
  border-radius: $size-border-radius;
  text-decoration: none;
  cursor: pointer;
  user-select: none;

  &:hover {
    color: $color-text-contrast;
    background: $color-btn-default;
  }
}

.disabled {
  cursor: default;
  pointer-events: none;
  border-color: $color-btn-disabled;
  color: $color-btn-disabled;
}

.page {
  display: inline-block;
  padding: $padding-base / 2 $padding-base;
}

.nomore {
  display: inline-block;
  margin-left: $margin-base;
  color: $color-btn-disabled;
}
</style>
