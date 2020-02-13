import { Place, Stack } from "./types"

// returns a string description of a 'place'
const space = ' '

export const describeNeighborhood = (place: Place, places: Place[]) => {
  let toReturn = "you're standing in the " + place.name + '.'

  place.connections.reduce((description, place) => {
    return description += `\n through the ${place.link} is ${place.place.name}`
  }, ("you're standing in the " + place.name + '.'))
  return toReturn
}

export const describeSet = (set: Stack[]) => {

  set.reduce((desc, stack) => {
    return desc
      + stack.item.name
      + (stack.quantity > 1) 
      ? `${stack.quantity}`
      : ''
    + '\n'

  }, '')
}

// adds the gramatically appropriate article to the string passed
export const addArticle = (string: string) => {
  const vowels = ['a', 'e', 'i', 'o', 'u']
  const article = vowels.includes(string.charAt(0)) ? 'an' : 'a'
  return article + space + string
}

// add prepend characters
export const prepend = (prepend: string) => (input: string) => {
  return prepend + space + input
}

export const templateString = (string: string, ...inputs: string[]) => {
  inputs.forEach((x, i) => {
    string = string.replace('$INPUT' + i, x)
  })
  return string
}

export const glue = (...strings: string[]) => {
  let toReturn = ''
  strings.forEach((x, i) => {
    toReturn += '\n\n'
    toReturn += x
  })
  return toReturn.trim()
}
