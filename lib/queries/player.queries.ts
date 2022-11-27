import { Place } from "../models/place"
import { Player } from "../models/player"
import { query } from "../surreal/surreal.client"

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

export const getPlayerIdByUserName = async (
  username: string
): Promise<{ id: string; username: string } | undefined> => {
  const player = await query<{ id: string; username: string }>(
    `SELECT id,username FROM player WHERE username = '${username}'`
  )
  return player
}
