<template>
  <div :class="[$style.wrapper]">
    <Header />
    <div :class="[$style.content]">
      Кажется, такой страницы не существует...
      <NoData />
      <router-link tag="a" to="/" :class="[$style.home]">
        Вернуться на главную
      </router-link>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header'
import NoData from '../components/NoData'

export default {
  components: {
    Header,
    NoData
  }
}
</script>

<style module lang="scss">
@import "../styles/const.scss";

.content {
  text-align: center;
  margin-top: 100px;
}

.home {
  text-decoration: none;
  color: $color-link;

  &:hover {
    text-decoration: underline;
  }
}
</style>
