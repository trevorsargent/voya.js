import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  // pages/api/[name].ts -> /api/lee
  // req.query.name -> "lee"\

  const res: CommandResponse  = {
    message: "hello"
  }
 return response.end(JSON.stringify(res))
}

export interface CommandResponse {
    message: string
}