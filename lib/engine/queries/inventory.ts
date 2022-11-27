import { getPlayerById } from "../../queries/player.queries"
import { describeHash } from "../../utils/string.utils"

export const inventory = async (playerId: string) => {
  const player = await getPlayerById(playerId)

  return describeHash(player.pockets)
}
