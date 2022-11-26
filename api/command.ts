import type { VercelRequest, VercelResponse } from "@vercel/node"
import { build } from "../lib/engine/actions"
import { act } from "../lib/engine/engine"
import { sanitizeBasic } from "../lib/utils/string.utils"
import { getPlayerIdByUserName } from "../lib/queries/player.queries"

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const body: CommandRequest = JSON.parse(request.body)

  const sanitized = sanitizeBasic(body.command)
  const username = body.username

  const player = username ? await getPlayerIdByUserName(username) : null

  const action = build(sanitized)

  const reply = await act(action, player?.id)

  const res: CommandResponse = {
    message: reply,
  }

  return response.end(JSON.stringify(res))
}

export interface CommandResponse {
  message: string
}

export interface CommandRequest {
  command: string
  username?: string
}
