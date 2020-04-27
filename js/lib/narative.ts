import { Place, Stack } from "./types"

// returns a string description of a 'place'
const space = ' '

export const describeNeighborhood = (place: Place) => {
  return place.links.reduce((description, link) => {
    return description += `\n through the ${link.name} is ${link.place.name}`
  }, ("you're standing in the " + place.name + '.'))
}

export const describeSet = (set: Stack[]): string => {
  return set.reduce((desc, stack) => {
    return desc
      + stack.item.name
      + (stack.quantity > 1)
      ? `${stack.quantity}`
      : ''
      + '\n'
  }, '')
}

// adds the gramatically appropriate article to the string passed
export const addArticle = (string: string): string => {
  const vowels = ['a', 'e', 'i', 'o', 'u']
  const article = vowels.includes(string.charAt(0)) ? 'an' : 'a'
  return article + space + string
}

// add prepend characters
export const prepend = (prepend: string) => (input: string) => {
  return prepend + space + input
}
