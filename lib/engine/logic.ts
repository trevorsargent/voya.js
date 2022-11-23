import { Place } from "../world/place"
import { Player } from "../world/player"

// returns whether a player can currently see

// returns whether a place is accessabel from another place
export const locationIsAccessable = (
  places: Record<string, Place>,
  current: Place,
  dest: Place
) => {
  if (dest === undefined) {
    return false
  }
  if (current.ahead && places[current.ahead] === dest) {
    return true
  }
  if (current.behind && places[current.behind] === dest) {
    return true
  }
  if (current.right && places[current.right] === dest) {
    return true
  }
  if (current.left && places[current.left] === dest) {
    return true
  }
  if (current.above && places[current.above] === dest) {
    return true
  }
  if (current.below && places[current.below] === dest) {
    return true
  }
  return false
}

export const hasPassiveAccess = (dest: Place, player: Player): boolean => {
  if (!dest.settings?.passiveKey) {
    return true
  }
  return player.pockets[dest.settings?.passiveKey] > 0
}
