<template>
  <div :class="[$style.wrapper]">
    <img src="../imgs/nodata.gif" />
  </div>
</template>

<script>
export default {

}
</script>

<style module lang="scss">
.wrapper {
  display: block;
  text-align: center;

  & img {
    height: 200px;
  }
}
</style>
