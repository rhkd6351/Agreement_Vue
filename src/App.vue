<template>
  <div id="page-wrapper">
    <top-navigation/>
    <router-view />
  </div>
</template>

<script>
import TopNavigation from './components/TopNavigation.vue'
export default {
  components: { TopNavigation },
  
}
</script>

<style lang="scss">


*{
  font-family: Noto Sans KR;
  margin: 0;
  padding: 0;
  text-decoration: none;
}

body{
  min-width: 400px;
}

</style>
