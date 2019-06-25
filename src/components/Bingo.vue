<template>
  <div class="bingo">
    <h1>{{ title }}</h1>
    <Balls />
  </div>
</template>

<script>
import Balls from './Balls.vue'

export default {
  name: 'Bingo',
  data () {
    return {
      title: 'Bingo'
    }
  },
  components: {
    Balls
  }
}
</script>

<style scoped lang="scss">
.bingo {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
