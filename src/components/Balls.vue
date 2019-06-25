<template>
  <div class="container">
    <!-- Container.vue -->
    <div class="row">
      <h2>{{ title }}</h2>
      <div class="balls">
        <button
          v-bind:balls=balls
          v-bind:key=ball.key
          v-for="ball in balls"
          v-bind:class="{active : ball.sorted, selected : ball.choiced}"
          class="ball"
          v-on:click="choice(ball)" >
          {{ ball.val }}
        </button>
      </div>
    </div>
    <!-- end Container.vue -->

    <!-- Panel.vue -->
    <div class="row">
      <h2>Choiced balls:</h2>
      <input type="number" v-model.number=choiced.amount v-bind:min=choiced.min  v-bind:max=choiced.max>
      <div class="choiced balls">
        <button
          v-bind:key=ball.key
          v-for="ball in choiced.balls"
          v-bind:class="{active : ball.sorted, selected : ball.choiced}"
          class="ball" >
          {{ ball.val }}
        </button>
        <div class="left"> left: {{choiced.left}}</div>
      </div>
      <input type="button" v-on:click=add() value="add" />
    </div>
    <!-- end Panel.vue -->

    <!-- Games.vue -->
    <div class="col">
      <h2>Games:</h2>
      <div
        v-bind:games=games
        v-bind:key=game.key
        v-for="game in games"
        class="game">
        <div class="index">#{{ game.key }}</div>
        <div class="balls">
          <div
            v-bind:key=ball.key
            v-for="ball in game.balls"
            class="ball"
            v-bind:class="{active : ball.sorted}"
            >
            {{ ball.val }}
          </div>
          <div class="hits">{{ game.hits }}</div>
        </div>
      </div>
    </div>
    <!-- end Games.vue -->

    <!-- Result.vue -->
    <div class="row">
      <input
        type="button"
        value="verify"
        v-on:click="verify()"
      >
    </div>
    <!-- end Resul.vue -->
  </div>
</template>

<script>
import {balls} from '../logic/balls.js'
import {choice, choiced, verify} from '../logic/game.js'

export default {
  name: 'Balls',
  data () {
    return {
      title: 'Game balls',
      balls: balls(60),
      choiced: choiced,
      games: [],
      choiceds: []
    }
  },
  methods: {
    choice(ball) {
      if (ball.key < 0) {
        return alert(`the key '${ball.key}' is invalid!`)
      }
      if(this.choiced.balls.length === this.choiced.amount && !ball.choiced) {
        return alert(
          `The number of choiced balls is ${this.choiced.amount}. Please, increase the 'amount' or click in 'add' button`
        )
      }
      ball.choiced = !ball.choiced
      this.choiced.balls = this.balls.filter(b => b.choiced === true)
      this.choiced.left = this.choiced.amount - this.choiced.balls.length
    },
    add() {
      if (this.choiced.amount === this.choiced.balls.length) {
        this.games.push({
          key: this.games.length,
          balls: this.choiced.balls.filter(f => f).sort((l, r) => l.val < r.val),
          hits: this.balls.reduce((r, b) => { if (b.sorted) { return r + 1} else { return 0 } }, 0)
        }
        )
        this.balls = this.balls.filter(f => {
          f.choiced = false
          return f
        })
        this.choiced.balls = []
      } else if (this.choiced.amount > this.choiced.balls.length) {
        return alert(`Please choice more  ${this.choiced.amount - this.choiced.balls.length} ball(s)`)
      } else if (this.choiced.amount < this.choiced.balls.length)
        return alert(`The number of choiced balls is insuficient!`)
    },
    verify() {
      this.balls.filter(b => b.sorted = false)
      this.choiceds = choice(this.balls, 6)
      verify(this.choiceds, this.games)
    }
  }
}
</script>

<style scoped lang="scss">
.game {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 500px;
}
.col {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  max-width: 600px;
  margin: 0 auto;

  h2 {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
}
.row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  h2 {
    flex: 1;
  }
  input {
    height: 36px;
    min-width: 36px;
    text-align: center;
    padding: 0 4px;
  }
}
.choiced {
  min-height: 32px;
  max-width: 360px;
  margin: 4px auto;
  border-radius: 16px;
  background-color: lightgray;
  border: solid 1px gray;
}
.balls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  width: 100%;

  .left {
    margin-left: auto;
    margin-right: 4px;
  }
  .hits {
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    padding: 2px;
    margin: 0 2px 0 auto;
    font-weight: bold;
    color: white;
    background: blue;
    border: solid 1px black;
  }

  .ball {
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    width: 26px;
    height: 26px;
    background: lightgray;
    border-radius: 50%;
    border: solid 1px black;
    padding: 2px;
    margin: 2px;

    &.active {
      font-weight: bold;
      color: white;
      background: green;
      border: solid 1px black; 
    }

    &.selected {
      font-weight: bold;
      color: white;
      background: blue;
      border: solid 1px black; 
    }
  }
}
</style>
