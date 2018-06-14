// returns whether a player can currently see
export const canSee = player => {
  if (player.currentLocation.settings.islit) {
    return true
  }
  for (let e in player.settings.lamps) {
    if (player.pockets[player.settings.lamps[e]]) {
      return true
    }
  }
  return false
}

// returns whether a place is accessabel from another place
export const locationIsAccessable = (places, current, dest) => {
  if (dest === undefined) {
    return false
  }
  if (places[current.ahead] === dest) {
    return true
  }
  if (places[current.behind] === dest) {
    return true
  }
  if (places[current.right] === dest) {
    return true
  }
  if (places[current.left] === dest) {
    return true
  }
  if (places[current.above] === dest) {
    return true
  }
  if (places[current.below] === dest) {
    return true
  }
  return false
}
