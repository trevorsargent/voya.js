import { Place } from "../world/place"
import { Player } from "../world/player"

// returns whether a player can currently see

// returns whether a place is accessabel from another place
export const locationIsAccessable = (current: Place, dest: Place) => {
  const list = [
    current.ahead,
    current.behind,
    current.right,
    current.left,
    current.above,
    current.below,
  ]
  return list.filter((x) => !!x).includes(dest.id)
}

export const hasPassiveAccess = (dest: Place, player: Player): boolean => {
  if (!dest.settings?.passiveKey) {
    return true
  }
  return player.pockets[dest.settings?.passiveKey] > 0
}
