<template>
  <div :class="[$style.wrapper]">
    <div :class="[$style.wrapper__content]">
      <div :class="[$style.logo]">
        <router-link tag="a" to="/">
          <div :class="[$style.logo__question]">Q&A</div> SERVICE
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style module lang="scss">
@import "../styles/const.scss";

.wrapper {
  padding: $padding-base / 2 $padding-base;
  background: $color-bg-light;

  &__content {
    max-width: $page-max-width;
    margin: auto;
  }
}

.logo {
  display: inline-block;
  border-bottom: 2px solid $color-bg-contrast;

  a {
    @include fontH3();
    color: $color-text;
    text-decoration: none;
    display: inline-block;
  }

  &__question {
    display: inline-block;
    background: $color-bg-contrast;
    color: $color-text-contrast;
    text-align: center;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    padding: 0 $padding-base / 2;
  }
}
</style>
