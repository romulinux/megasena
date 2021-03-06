'use strict'

const random = function (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

export const chosen = {
  amount: 6,
  min: 6,
  max: 12,
  balls: [],
  left: 6
}

export const auto = function (balls, amount = 6) {
  if (amount > balls.length) {
    return alert(`The '${amount}' is greater than number of balls`)
  } else {
    let keys = []
    balls.filter(b => {
      keys.push(b.key)
    })
    for (let i = 0; i < amount; i++) {
      const key = keys.splice(random(0, keys.length), 1)[0]
      for (let j = 0; j < balls.length; j++) {
        if (balls[j].key === key) {
          balls[j].chosen = true
          break
        }
      }
    }
  }
}

export const choose = function (balls, amount = 6) {
  if (amount > balls.length) {
    return alert(`The '${amount}' is greater than number of balls`)
  } else {
    let keys = []
    balls.filter(b => {
      keys.push(b.key)
    })
    for(let i = 0; i < amount; i++) {
      const key = keys.splice(random(0, keys.length), 1)[0]
      for (let j = 0; j < balls.length; j++) {
        if (balls[j].key === key) {
          balls[j].awarded = true
          break
        }
      }
    }
  }
}

export const verify = function (games) {
  games.filter(g => g.hits = g.balls.reduce((r, b) => b.awarded ? r + 1 : r, 0))
}
