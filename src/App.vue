<template>
  <div id="app">
    <Bingo />
  </div>
</template>

<script>
import Bingo from './components/Bingo.vue'

export default {
  name: 'app',
  components: {
    Bingo
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}
</style>
