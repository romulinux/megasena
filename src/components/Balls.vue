<template>
  <div class="container">
    <!-- Container.vue -->
    <div class="row">
      <h2>balls</h2>
      <div class="balls">
        <button
          v-bind:balls=balls
          v-bind:key=ball.key
          v-for="ball in balls"
          v-bind:class="{awarded : ball.awarded, selected : ball.chosen}"
          class="ball"
          v-on:click="choose(ball)"
        >
          {{ ball.val }}
        </button>
      </div>
    </div>
    <!-- end Container.vue -->

    <!-- Panel.vue -->
    <div class="row">
      <h2>chosen balls:</h2>
      <input type="number" v-model.number=chosen.amount v-bind:min=chosen.min  v-bind:max=chosen.max>
      <input type="button" value="auto" v-on:click=auto()>
      <div class="chosen balls">
        <button
          v-bind:key=ball.key
          v-for="ball in chosen.balls"
          v-bind:class="{awarded : ball.awarded, selected : ball.chosen}"
          class="ball"
          v-on:click="choose(ball)"
        >
          {{ ball.val }}
        </button>
        <div class="left"> left: {{chosen.left}}</div>
      </div>
      <input type="button" v-on:click=add() value="add" />
    </div>
    <!-- end Panel.vue -->

    <!-- Games.vue -->
    <div class="col">
      <h2>play sets:</h2>
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
            v-bind:class="{awarded : ball.awarded}"
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
import {auto, choose, chosen, verify} from '../logic/game.js'

export default {
  name: 'Balls',
  data () {
    return {
      balls: balls(60),
      chosen: chosen,
      games: []
    }
  },
  methods: {
    auto() {
      this.balls.filter(f => f.chosen = false)
      auto(this.balls, this.chosen.amount)
      this.chosen.balls = this.balls.filter(b => b.chosen === true)
      this.chosen.left = this.chosen.amount - this.chosen.balls.length
    },
    choose(ball) {
      if (ball.key < 0) {
        return alert(`the key '${ball.key}' is invalid!`)
      }
      if(this.chosen.balls.length === this.chosen.amount && !ball.chosen) {
        return alert(
          `The number of chosen balls is ${this.chosen.amount}. Please, increase the 'amount' or click in 'add' button`
        )
      }
      ball.chosen = !ball.chosen
      this.chosen.balls = this.balls.filter(b => b.chosen === true)
      this.chosen.left = this.chosen.amount - this.chosen.balls.length
    },
    add() {
      if (this.chosen.amount === this.chosen.balls.length) {
        this.games.push({
          key: this.games.length,
          balls: this.chosen.balls.sort((l, r) => l.val < r.val),
          hits: this.chosen.balls.reduce((r, b) => b.awarded ? r + 1 : r , 0)
        }
        )
        this.balls.filter(f => { f.chosen = false })
        this.chosen.balls = []
      } else if (this.chosen.amount > this.chosen.balls.length) {
        return alert(`Please choose more '${this.chosen.amount - this.chosen.balls.length}' ball(s)`)
      } else if (this.chosen.amount < this.chosen.balls.length) {
        return alert(`The number of chosen balls is too high! Please, remove '${this.chosen.balls.length - this.chosen.amount}' ball(s).`)
      }
    },
    verify() {
      this.balls.filter(b => b.awarded = false)
      choose(this.balls, 6)
      verify(this.games)
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
.chosen {
  min-height: 32px;
  max-width: 420px;
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

    &.awarded {
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
