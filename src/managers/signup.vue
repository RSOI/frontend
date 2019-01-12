<template>
  <div :class="[$style.wrapper]">
    <Header />
    signup
  </div>
</template>

<script>
import Header from '../components/Header'
export default {
  components: {
    Header
  }
}
</script>

<style module lang="scss">
@import "../styles/const.scss";

.wrapper {

}
</style>
