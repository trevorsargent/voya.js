import { getClient } from "../surreal/surreal.client"
import { Place } from "../models/place"
import { Player } from "../models/player"

export const savePlayer = async (player: Player) => {
  var db = await getClient()
  return db.update<Player>(player.id, {
    currentLocation: player.currentLocation,
    height: player.height,
    id: player.id,
    locationHistory: player.locationHistory,
    pockets: player.pockets,
    settings: player.settings,
    username: player.username,
  })
}

export const savePlace = async (place: Place) => {
  await (
    await getClient()
  ).update<Place>(place.id, {
    id: place.id,
    name: place.name,
    above: place.above,
    ahead: place.ahead,
    behind: place.behind,
    below: place.below,
    exchanges: place.exchanges,
    isLocked: place.isLocked,
    left: place.left,
    messages: place.messages,
    objects: place.objects,
    right: place.right,
    settings: place.settings,
  })
}
