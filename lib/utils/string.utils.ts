// returns a string description of a 'place'
const space = " "

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

export const sanitize = (string: string) => (input: string) => {
  return sanitizeBasic(input).replace(string, "").trim()
}

// TODO: read the list of articles and words from the database instead of hard coding them here.
export const sanitizeBasic = (input: string) => {
  return input
    .trim()
    .replace(/\sthe\s/g, " ")
    .replace(/\sa\s/g, " ")
    .replace(/\sto\s/g, " ")
    .trim()
}
