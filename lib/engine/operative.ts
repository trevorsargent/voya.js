// easily remove a particular word from a string

export const sanitize = (string) => (input) => {
  return sanitizeBasic(input).replace(string, "").trim();
};

// remove common unnecessary articles and words from a string
// TODO: read the list of articles and words from the database instead of hard coding them here.
export const sanitizeBasic = (input) => {
  return input
    .trim()
    .replace("the ", "")
    .replace("a ", "")
    .replace("to ", "")
    .trim();
};

export const filterEmpty = (input) => {
  return input !== "";
};

// adds an item a hash
export const hashAdd = (hash, string) => {
  if (string in hash) {
    hash[string]++;
  } else {
    hash[string] = 1;
  }
  return hash;
};

// removes an item from a hash
export const hashRemove = (hash, string) => {
  if (string in hash) {
    hash[string]--;
    if (hash[string] <= 0) {
      delete hash[string];
    }
  }
  return hash;
};

export const hashHasItems = (hash: object): boolean => {
  const sum = Object.values(hash).reduce((a, b) => a + b, 0);
  return sum > 0;
};

export const findPlaceFromName = (placeName, places) => {
  for (let e in places) {
    if (places[e].name === placeName) {
      return places[e];
    }
  }
};
