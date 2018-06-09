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
