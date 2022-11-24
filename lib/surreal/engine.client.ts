import { Player } from "../world/player"
import { getClient } from "./surreal.client"
import { Result } from "surrealdb.js"
import { Place } from "../world/place"

export const savePlayer = async (player: Player) => {
  var db = await getClient()
  return db.update(player.id, player)
}

export const savePlace = async (place: Place) => {
  await (await getClient()).update(place.id, place)
}

export const query = async <T>(string: string): Promise<T | undefined> => {
  const c = await getClient()
  const x = await c.query<Result<T[]>[]>(string)
  return x.shift()?.result?.shift()
}
