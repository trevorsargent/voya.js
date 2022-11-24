import { query } from "../surreal/engine.client"
import { Place } from "../world/place"
import { Player } from "../world/player"

export const getPlayerById = async (id: string): Promise<Player> => {
  const player = await query<Player>(`SELECT * FROM ${id}`)
  if (!player) throw new Error("Player Not Found")
  return player
}

export const getPlayerWithFullLocation = async (
  id: string
): Promise<Player & { loc?: Place }> => {
  const player = await query<Player & { loc: Place }>(
    `SELECT *, currentLocation.* as loc FROM ${id}`
  )
  if (!player) throw new Error("Player Not Found")
  return player
}

export const getPlayerByUserName = async (
  username: string
): Promise<Player> => {
  const player = await query<Player>(
    `SELECT * FROM player WHERE username = ${username}`
  )
  if (!player) throw new Error("Player Not Found")

  return player
}
