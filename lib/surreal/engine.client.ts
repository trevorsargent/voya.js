import { Player } from "../world/player"
import { getClient } from "./surreal.client"
import * as JSON from "../../roms/carnival.json"
import { Result } from "surrealdb.js"

export const savePlayer = async (player: Player) => {
  var db = await getClient()

  return db.update(player.id, player)
}

export const getPlayer = async (id: string): Promise<Player> => {
  var db = await getClient()
  try {
    return await db.select<Player>(id).then((x) => x[0])
  } catch (e) {
    return {
      id: "player:0",
      ...JSON.defaultPlayer,
      currentLocation: JSON.settings.startingPlace,
      locationHistory: [],
    }
  }
}

export const query = <T>(string: string): Promise<T | undefined> => {
  return getClient()
    .then((c) => c.query<Result<T[]>[]>(string))
    .then((x) => x.shift()?.result?.shift())
}
