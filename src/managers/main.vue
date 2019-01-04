<template>
  <div :class="[$style.wrapper]">
    Main page
  </div>
</template>

<script>
export default {
}
</script>

<style module lang="scss">
@import "../styles/const.scss";

.wrapper {
  padding: $padding-base;
  border: 1px solid green;
  box-sizing: border-box;
  width: 100%;
}
</style>
