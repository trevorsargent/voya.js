import { z } from "zod"
import { getPlayerIdByUserName } from "../../queries/player.queries"
import { procedure } from "../trpc.base"

export const login = procedure
  .input(
    z.object({
      username: z.string(),
    })
  )
  .mutation(async ({ input }) => {
    const username = input.username
    const player = username ? await getPlayerIdByUserName(username) : null

    if (!player) {
      const res: SigninFailure = {
        success: false,
        message: "user does not exist. please signup to enter",
      }
      return res
    }

    const res: SigninSuccess = {
      success: true,
      message: `signed in as ${player.username}`,
      playerId: player.id,
      username: player.username,
    }

    return res
  })

export interface SigninSuccess {
  success: true
  message: string
  username: string
  playerId: string
}

export interface SigninFailure {
  success: false
  message: string
}
