import { getClient } from "../surreal/surreal.client"
import { Place } from "../models/place"
import { Player } from "../models/player"

export const savePlayer = async (player: Player) => {
  var db = await getClient()
  return db.update<Player>(player.id, player)
}

export const savePlace = async (place: Place) => {
  const db = await getClient()
  return await db.update<Place>(place.id, place)
}
