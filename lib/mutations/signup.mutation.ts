import { defaultPlayer } from "../content/player.default"
import { Player } from "../models/player"
import { getClient } from "../surreal/surreal.client"

export const singup = async (username: string): Promise<Player> => {
  const client = await getClient()
  const result = await client.create<Omit<Player, "id">>("player", {
    ...defaultPlayer,
    username,
  })
  return result
}
