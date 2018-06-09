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
export const locationIsAccessable = (player, dest) => {
  if (dest === undefined) {
    return false
  }
  if (player.currentLocation.ahead === dest) {
    return true
  }
  if (player.currentLocation.behind === dest) {
    return true
  }
  if (player.currentLocation.right === dest) {
    return true
  }
  if (player.currentLocation.left === dest) {
    return true
  }
  if (player.currentLocation.above === dest) {
    return true
  }
  if (player.currentLocation.below === dest) {
    return true
  }
  return false
}
