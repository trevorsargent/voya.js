import { messages } from "../../content/messages"
import { savePlace, savePlayer } from "../../mutations/save.mutations"
import { getPlayerWithFullLocation } from "../../queries/player.queries"
import { recordAdd, recordRemove } from "../../utils/record.utils"
import { addArticle } from "../../utils/string.utils"

export const drop = async (playerId: string, item?: string) => {
  if (!item) {
    return messages.dropError + "nothing"
  }

  const player = await getPlayerWithFullLocation(playerId)
  const { loc } = player
  delete player.loc

  if (!loc) {
    return "cant drop here"
  }

  if (player.pockets[item] > 0) {
    recordRemove(player.pockets, item)
    recordAdd(loc.objects!, item)
    await savePlace(loc)
    await savePlayer(player)
    return messages.dropSuccess + addArticle(item)
  }
  return messages.dropError + addArticle(item)
}
