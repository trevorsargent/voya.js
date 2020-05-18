import seedrandom from 'seedrandom'

const id = 'no'

/**
 * @description returns the generated place for the id
 * @param  {ID} id
 * @returns Place
 */
const place = (id: ID, agent: Person): Place => {
  const rng = seedrandom(id)
  const exists = rBool(rng, 0.5)

  return {
    exists
  }
}

const person = (id: ID): Person => {
  return {}
}

abstract class Place {
  exists: boolean
}

abstract class Person {
  disposition: () => Disposition
}

abstract class Disposition {
  joy: number
  trust: number
  fear: number
  surprise: number
  sadness: number
  disgust: number
  anger: number
  anticipation: number
}

/**
 * @description Boolean flag with a percentage probability.
 * @param {seedrandom.prng} rng RNG
 * @param {number} p probability of truth
 * @return {boolean}
 */
const rBool = (rng: seedrandom.prng, p: number) => {
  return rng() > p
}

/**
 * @description return a random number between to values
 * @param  {seedrandom.prng} rng RNG
 * @param  {number} min min value
 * @param  {number} max max value
 * @returns value
 */
const rVal = (rng: seedrandom.prng, min: number, max: number): number => {
  return rng() * (max - min) + min
}

type ID = string

console.log(place(id, {}))
