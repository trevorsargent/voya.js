import { messages } from "../../content/messages"
import { getPlayerWithFullLocation } from "../../queries/player.queries"
import { recordHasKeys } from "../../utils/record.utils"
import { describeHash } from "../../utils/string.utils"

export const items = async (playerId: string): Promise<string> => {
  const { loc } = await getPlayerWithFullLocation(playerId)
  if (!loc?.objects) return messages.itemsError
  if (!recordHasKeys(loc.objects)) return messages.itemsError
  return describeHash(loc.objects)
}
