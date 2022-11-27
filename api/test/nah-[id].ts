import type { VercelRequest, VercelResponse } from "@vercel/node"

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const body = request.body

  response.end(JSON.stringify(body))
}

export interface CommandResponse {
  message: string
}
