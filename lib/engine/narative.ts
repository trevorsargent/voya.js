import { query } from "../surreal/engine.client"

// returns a string description of a 'place'
const space = " "

export const describeNeighborhood = async (): Promise<string> => {
  var place = await query<{
    left: string
    right: string
    ahead: string
    behind: string
    name: string
  }>(
    "SELECT currentLocation.name as name, currentLocation.ahead.name as ahead, currentLocation.right.name as right, currentLocation.left.name as left, currentLocation.behind.name as behind FROM player:0"
  )

  if (!place) {
    return "i'm not sure where you are"
  }
  let toReturn = "you're standing in the " + place.name + "."
  if (place.left !== null) {
    toReturn += "\n on your left is the " + place.left + "."
  }
  if (place.right !== null) {
    toReturn += "\n on your right is the " + place.right + "."
  }
  if (place.ahead !== null) {
    toReturn += "\n ahead of you is the " + place.ahead + "."
  }
  if (place.behind !== null) {
    toReturn += "\n behind you is the " + place.behind + "."
  }
  return toReturn
}

export const describeHash = (hash: Record<string, number>) => {
  let toReturn = ""
  for (let item in hash) {
    toReturn += item + ": (" + hash[item] + ") \n"
  }
  return toReturn
}

// adds the gramatically appropriate article to the string passed
export const addArticle = (string: string) => {
  const vowels = ["a", "e", "i", "o", "u"]
  const article = vowels.includes(string.charAt(0)) ? "an" : "a"
  return article + space + string
}

// add prepend characters
export const prepend = (prepend: string) => (input: string) => {
  return prepend + space + input
}

export const templateString = (string: string, ...inputs: string[]) => {
  inputs.forEach((x, i) => {
    string = string.replace("$INPUT" + i, x)
  })
  return string
}

export const glue = (...strings: string[]): string => {
  let toReturn = ""
  strings.forEach((x, i) => {
    toReturn += "\n\n"
    toReturn += x
  })
  return toReturn.trim()
}
