'use strict'

const random = function (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  const r = Math.floor(Math.random() * (max - min)) + min
  return r
}

export const choiced = {
  amount: 6,
  min: 6,
  max: 12,
  balls: [],
  left: 6
}

export const choice = function (balls, amount = 6) {
  if (amount > balls.length) {
    alert(`The '${amount}' is greater than number of balls`)
  } else {
    let choiceds = []
    let keys = []
    balls.filter(b => {
      keys.push(b.key)
    })
    for(let i = 0; i < amount; i++) {
      let key = random(0, keys.length)
      keys.splice(key, 1)
      choiceds.push(balls[key])
      balls.filter(b => {
        if(b.key == key) {
          b.sorted = true
        }
      })
    }
    return choiceds
  }
  return []
}

export const verify = function (balls, games) {
  games.filter(g => {
    g.hits = g.balls.reduce((r, b) => b.sorted ? r + 1 : r, 0)
  })
  return {
    balls, games
  }
}
