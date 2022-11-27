import { getPlayerWithFullLocation } from "../../queries/player.queries"

export const describeNewPlayerLocation = async (
  playerId: string
): Promise<string> => {
  const player = await getPlayerWithFullLocation(playerId)
  const { loc } = player

  if (!player.locationHistory.find((p) => p == loc?.name)) return ""

  return loc?.messages?.newText || ""
}
