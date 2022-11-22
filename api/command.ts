import type { VercelRequest, VercelResponse } from "@vercel/node";
import { broadcast } from "../lib/pusher.server";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  // pages/api/[name].ts -> /api/lee
  // req.query.name -> "lee"\

  const res: CommandResponse = {
    message: "hello",
  };

  await broadcast("Someone Connected");

  return response.end(JSON.stringify(res));
}

export interface CommandResponse {
  message: string;
}
