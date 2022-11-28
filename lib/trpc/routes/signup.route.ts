import { procedure } from "../trpc.base"
import { z } from "zod"
import { getPlayerIdByUserName } from "../../queries/player.queries"
import { singup } from "../../mutations/signup.mutation"

export const signup = procedure
  .input(
    z.object({
      username: z.string(),
    })
  )
  .mutation(async ({ input }) => {
    const username = input.username

    const player = username ? await getPlayerIdByUserName(username) : null

    if (player) {
      const res: SignupFailure = {
        message: "user already exists",
        success: false,
      }
      return res
    }

    const p = await singup(username)

    const res: SignupSuccess = {
      message: `signed up as ${p.username}`,
      success: true,
      username: p.username,
      playerId: p.id,
    }

    return res
  })

export interface SignupSuccess {
  success: true
  message: string
  username: string
  playerId: string
}

export interface SignupFailure {
  success: false
  message: string
}
