// adds an item a hash
export const recordAdd = (hash: Record<string, number>, string: string) => {
  if (string in hash) {
    hash[string]++
  } else {
    hash[string] = 1
  }
  return hash
}

// removes an item from a hash
export const recordRemove = (hash: Record<string, number>, string: string) => {
  if (string in hash) {
    hash[string]--
    if (hash[string] <= 0) {
      delete hash[string]
    }
  }
  return hash
}

export const recordHasKeys = (hash: Record<string, number>): boolean => {
  const sum = Object.values(hash).reduce((a, b) => a + b, 0)
  return sum > 0
}
