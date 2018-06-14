// returns a string description of a 'place'
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
  if (Object.keys(hash).length > 0) {
    for (let item in hash) {
      toReturn += item + ': (' + hash[item] + ') \n'
    }
    return toReturn
  } else {
    return false
  }
}

// adds the gramatically appropriate article to the string passed
export const addArticle = string => {
  let vowels = ['a', 'e', 'i', 'o', 'u']
  let article = ''
  if (vowels.includes(string.charAt(0))) {
    article = 'an '
  } else {
    article = 'a '
  }
  return article + ' ' + string
}

// add prepend characters
export const prepend = prepend => input => {
  return prepend + ' ' + input
}

export const glue = (...strings) => {
  let toReturn = ''
  strings.forEach((x, i) => {
    if (i !== 0) {
      toReturn += '\n\n'
    }
    toReturn += x
  })
  return toReturn
}
