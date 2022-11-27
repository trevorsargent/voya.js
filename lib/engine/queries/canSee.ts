import { getPlayerWithFullLocation } from "../../queries/player.queries"

export const canSee = async (playerId: string): Promise<boolean> => {
  const player = await getPlayerWithFullLocation(playerId)
  const { loc } = player
  if (!loc) {
    return false
  }

  if (!loc) {
    return false
  }
  if (loc.settings?.isLit) {
    return true
  }
  for (let e in player.settings.lamps) {
    if (player.pockets[e] > 0) {
      return true
    }
  }
  return false
}
