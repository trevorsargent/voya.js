import { messages } from "../../content/messages"
import { savePlayer } from "../../mutations/save.mutations"
import { getPlayerWithFullLocation } from "../../queries/player.queries"
import { recordAdd, recordRemove } from "../../utils/record.utils"
import { templateString } from "../../utils/string.utils"

export const exchange = async (playerId: string, item?: string) => {
  if (!item) {
    return messages.exchangeFailure
  }

  const player = await getPlayerWithFullLocation(playerId)
  const { loc } = player
  delete player.loc

  if (!loc) {
    return messages.exchangeFailure
  }
  if (loc.exchanges && loc.exchanges[item] !== undefined) {
    const newItem = loc.exchanges[item]
    recordAdd(player.pockets, newItem)
    recordRemove(player.pockets, item)
    await savePlayer(player)
    return templateString(messages.exchangeSuccess, item, newItem)
  }
  return messages.exchangeFailure
}
