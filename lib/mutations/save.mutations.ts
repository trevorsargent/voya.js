import { getClient } from "../surreal/surreal.client"
import { Place } from "../models/place"
import { Player } from "../models/player"

export const savePlayer = async (player: Player) => {
  var db = await getClient()
  return db.update<Omit<Player, "id">>(player.id, player)
}

export const savePlace = async (place: Place): Promise<Place> => {
  const db = await getClient()
  return await db.update<Omit<Place, "id">>(place.id, place)
}
