// easily remove a particular word from a string

export const sanitize = string => input => {
  return sanitizeBasic(input).replace(string, '').trim()
}

// remove common unnecessary articles and words from a string
// TODO: read the list of articles and words from the database instead of hard coding them here.
export const sanitizeBasic = (input) => {
  return input
    .trim()
    .replace('the ', '')
    .replace('a ', '')
    .replace('to ', '')
    .trim()
}

export const filterEmpty = (input) => {
  return input !== ''
}

// adds an item a hash
export const hashAdd = (string, hash) => {
  if (string in hash) {
    hash[string]++
  } else {
    hash[string] = 1
  }
  return hash
}

// removes an item from a hash
export const hashRemove = (string, hash) => {
  if (string in hash) {
    hash[string]--
    if (hash[string] <= 0) {
      delete hash[string]
    }
  }
  return hash
}

export const findPlaceFromName = (placeName, places) => {
  for (let e in places) {
    if (places[e].name === placeName) {
      return places[e]
    }
  }
}

export const applyDefaults = (place, base) => {
  place.settings = place.settings || {}
  place.settings.beenHere = place.settings.beenHere || base.settings.beenHere
  place.settings.isLocked = place.settings.isLocked || base.settings.isLocked
  place.settings.isLit = place.settings.isLit || base.settings.isLit
  place.messages = place.messages || {}
  place.messages.newText = place.messages.newText || ''
  place.objects = place.objects || {}
  place.exchanges = place.exchanges || {}
  return place
}
