import type { VercelRequest, VercelResponse } from "@vercel/node"
import { getPlayerIdByUserName } from "../lib/queries/player.queries"

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const body: SigninRequest = JSON.parse(request.body)

  const username = body.username

  const player = username ? await getPlayerIdByUserName(username) : null

  if (!player) {
    const res: SigninResponse = {
      success: false,
      message: "user does not exist. please signup to enter",
    }
    return response.end(JSON.stringify(res))
  }

  const res: SigninResponse = {
    success: true,
    message: `signed in as ${player.username}`,
    playerId: player.id,
    username: player.username,
  }

  return response.end(JSON.stringify(res))
}

export type SigninResponse = SigninSuccess | SigninFailure

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

export interface SigninRequest {
  username: string
}
