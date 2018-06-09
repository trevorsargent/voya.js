// easily remove a particular word from a string 
export const sanitize = string => input => {
  sanitizeBasic(input).replace(string, '')
}

// remove common unnecessary articles and words from a string
// TODO: read the list of articles and words from the database instead of hard coding them here. 
export const sanitizeBasic = (input) => {
  input
    .trim()
    .replace('the ', '')
    .replace('a ', '')
    .replace('to ', '')
    .trim()
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

export const applyDefaults = (subject, base) => {
  subject.settings = subject.settings || {}
  subject.settings.beenHere = subject.settings.beenHere || base.settings.beenHere
  subject.settings.isLocked = subject.settings.isLocked || base.settings.isLocked
  subject.settings.isLit = subject.settings.isLit || base.settings.isLit
  subject.messages = subject.messages || {}
  subject.objects = subject.objects || {}
  subject.exchanges = subject.exchanges || {}
  return subject
}
