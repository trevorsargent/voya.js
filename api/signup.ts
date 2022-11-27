import type { VercelRequest, VercelResponse } from "@vercel/node"
import { singup } from "../lib/mutations/signup.mutation"
import { getPlayerIdByUserName } from "../lib/queries/player.queries"

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const body: SignupRequest = JSON.parse(request.body)

  const username = body.username

  const player = username ? await getPlayerIdByUserName(username) : null

  if (player) {
    const res: SignupResponse = {
      message: "user already exists",
      success: false,
    }
    return response.end(JSON.stringify(res))
  }

  const p = await singup(username)

  const res: SignupResponse = {
    message: `signed up as ${p.username}`,
    success: true,
    username: p.username,
    playerId: p.id,
  }

  return response.end(JSON.stringify(res))
}

export type SignupResponse = SignupSuccess | SignupFailure

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

export interface SignupRequest {
  username: string
}
