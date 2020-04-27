import { Place, Player } from "./types"

// returns whether a player can currently see
export const canSee = (player: Player) => {
  if (player.location.settings.lit) {
    return true
  }

  return player.pockets
    .some(stack =>
      player.pockets
        .map(s => s.item.name)
        .includes(stack.item.name)
    )
}

// returns whether a place is accessabel from another place
export const locationIsAccessable = (current: Place, dest: Place): boolean => {
  return current.links.some(con => con.place.name === dest.name)
}

export const hasPassiveAccess = (dest: Place, player: Player) => {
  return player.pockets.map(stack => stack.item.name).includes(dest.settings.passiveKey?.name ?? "#")
}
