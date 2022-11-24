import { Player } from "../world/player"
import { getClient } from "./surreal.client"
import { Result } from "surrealdb.js"
import { Place } from "../world/place"

export const savePlayer = async (player: Player) => {
  var db = await getClient()
  return db.update(player.id, player)
}

export const getPlayerById = async (id: string): Promise<Player> => {
  const player = await query<Player>(`SELECT * FROM ${id}`)
  if (!player) throw new Error("Player Not Found")
  return player
}

export const getPlayerWithFullLocation = async (
  id: string
): Promise<Player & { loc: Place }> => {
  const player = await query<Player & { loc: Place }>(
    `SELECT *, currentLocation.* as loc FROM ${id}`
  )
  if (!player) throw new Error("Player Not Found")
  return player
}

export const getPlayerByUserName = async (
  username: string
): Promise<Player> => {
  console.log(username)
  const player = await query<Player>(
    `SELECT * FROM player WHERE username = ${username}`
  )
  if (!player) throw new Error("Player Not Found")

  return player
}

export const query = async <T>(string: string): Promise<T | undefined> => {
  const c = await getClient()
  const x = await c.query<Result<T[]>[]>(string)
  return x.shift()?.result?.shift()
}
