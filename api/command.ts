import type { VercelRequest, VercelResponse } from "@vercel/node"
import { build } from "../lib/utils/action.utils"
import { processAction } from "../lib/engine/engine"
import { sanitizeBasic } from "../lib/utils/string.utils"

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const body: CommandRequest = JSON.parse(request.body)

  const sanitized = sanitizeBasic(body.command)
  const playerId = body.playerId

  const action = build(sanitized)

  const reply = await processAction(action, playerId)

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
  playerId: string | null
}
