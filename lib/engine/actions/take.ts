import { messages } from "../../content/messages"
import { savePlayer, savePlace } from "../../mutations/save.mutations"
import { getPlayerWithFullLocation } from "../../queries/player.queries"
import { recordAdd, recordRemove } from "../../utils/record.utils"
import { addArticle } from "../../utils/string.utils"

export const take = async (playerId: string, item?: string) => {
  if (!item) {
    return messages.takeError
  }
  const player = await getPlayerWithFullLocation(playerId)
  const { loc } = player
  delete player.loc

  if (!loc) {
    return messages.takeError
  }
  if (loc.objects && loc.objects[item] > 0) {
    recordAdd(player.pockets, item)
    recordRemove(loc.objects!, item)
    await savePlayer(player)
    await savePlace(loc)
    return messages.takeSuccess + addArticle(item)
  }
  return messages.takeError + addArticle(item)
}
