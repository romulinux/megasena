'use strict'

export function balls (amount = 60) {
  let balls = []
  for(let i = 0; i < amount; i++) {
    balls.push({
      key: i,
      val: (i + 1).toString().padStart(2, '0'),
      sorted: false,
      choiced: false
    })
  }
  return balls
}
