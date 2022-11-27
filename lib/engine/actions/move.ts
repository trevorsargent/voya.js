import { messages } from "../../content/messages"
import { Place } from "../../models/place"
import { savePlayer } from "../../mutations/save.mutations"
import { getPlayerWithFullLocation } from "../../queries/player.queries"
import { query } from "../../surreal/surreal.client"
import { locationIsAccessable, hasPassiveAccess } from "../../utils/place.utils"
import { glue } from "../../utils/string.utils"
import { describeNewPlayerLocation } from "../queries/describeNewPlayerLocation"
import { describePlayerLocation } from "../queries/descrivePlayerLocation"

export const move = async (
  playerId: string,
  placeName?: string
): Promise<string> => {
  if (!placeName) {
    return messages.moveError
  }
  let neededPassiveKey = false
  const player = await getPlayerWithFullLocation(playerId)
  const place = await query<Place>(
    `SELECT * FROM place WHERE name = '${placeName}'`
  )

  if (!place || !player.loc) {
    return messages.moveError
  }

  if (!locationIsAccessable(player.loc, place)) {
    return messages.moveError
  }

  if (place.settings?.passiveKey) {
    if (hasPassiveAccess(place, player)) {
      neededPassiveKey = true
    } else {
      return place.messages?.passiveKeyFailure ?? ""
    }
  }

  player.locationHistory.push(player.currentLocation)

  player.currentLocation = place.id

  delete player.loc
  await savePlayer(player)
  return glue(
    neededPassiveKey ? place.messages?.passiveKeySuccess ?? "" : "",
    messages.moveMessage + place.name,
    await describePlayerLocation(playerId),
    await describeNewPlayerLocation(playerId)
  )
}
