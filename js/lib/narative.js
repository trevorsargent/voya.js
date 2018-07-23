// returns a string description of a 'place'
const space = ' '

export const describeNeighborhood = (place, places) => {
  let toReturn = "you're standing in the " + place.name + '.'
  if (place.left !== undefined) {
    toReturn += '\n on your left is the ' + places[place.left].name + '.'
  }
  if (place.right !== undefined) {
    toReturn += '\n on your right is the ' + places[place.right].name + '.'
  }
  if (place.ahead !== undefined) {
    toReturn += '\n ahead of you is the ' + places[place.ahead].name + '.'
  }
  if (place.behind !== undefined) {
    toReturn += '\n behind you is the ' + places[place.behind].name + '.'
  }
  return toReturn
}

export const describeHash = (hash) => {
  let toReturn = ''
  for (let item in hash) {
    toReturn += item + ': (' + hash[item] + ') \n'
  }
  return toReturn
}

// adds the gramatically appropriate article to the string passed
export const addArticle = string => {
  const vowels = ['a', 'e', 'i', 'o', 'u']
  const article = vowels.includes(string.charAt(0)) ? 'an' : 'a'
  return article + space + string
}

// add prepend characters
export const prepend = (prepend) => input => {
  return prepend + space + input
}

export const templateString = (string, ...inputs) => {
  inputs.forEach((x, i) => {
    string = string.replace('$INPUT' + i, x)
  })
  return string
}

export const glue = (...strings) => {
  let toReturn = ''
  strings.forEach((x, i) => {
    toReturn += '\n\n'
    toReturn += x
  })
  return toReturn.trim()
}
