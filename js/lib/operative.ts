import { Item, Stack } from "./types"

// easily remove a particular word from a string

export const sanitize = (string: string) => (input: string) : string => {
  return sanitizeBasic(input).replace(string, '').trim()
}

// remove common unnecessary articles and words from a string
// TODO: read the list of articles and words from the database instead of hard coding them here.
export const sanitizeBasic = (input: string) : string =>  {
  return input
    .trim()
    .replace('the ', '')
    .replace('a ', '')
    .replace('to ', '')
    .trim()
}

export const filterEmpty = (input: string) : boolean => {
  return input !== ''
}

// adds an item a hash
export const setAdd = (set: Stack[], itemToAdd: Item): Stack[] => {

  if (!set.map(stack => stack.item.name).includes(itemToAdd.name)) {
    return [...set, {
      item: itemToAdd, 
      quantity: 1
    }]
  }

  return {
    ...set.map(stack => {
      return {
        item: stack.item,
        quantity: stack.item.name === itemToAdd.name
          ? stack.quantity + 1
          : stack.quantity
      }
    })
  }
}

// removes an item from a hash
export const setRemove = (set: Stack[], itemToRemove: Item) => {
  return set.map(stack => ({
    item: stack.item, 
    quantity: stack.item.name === itemToRemove.name 
      ? stack.quantity - 1
      : stack.quantity
  })).filter(stack => stack.quantity > 0)
}

export const hashHasItems = (hash: Object) : boolean => {
  const sum : number = Object
    .values(hash)
    .reduce((a, b) => a + b, 0)
  return sum > 0
}

export const findPlaceFromName = (placeName: string, places: any[]) => {
  for (let e in places) {
    if (places[e].name === placeName) {
      return places[e]
    }
  }
}
