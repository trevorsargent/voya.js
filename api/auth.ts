import type { VercelRequest, VercelResponse } from "@vercel/node";
import Pusher from "pusher";
import { broadcast, pusher } from "../lib/pusher/server";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const body = request.body;
  const socketId = body.socket_id as string;
  const username = body.username as string;

  const user: Pusher.UserChannelData = {
    id: username,
  };

  const auth = pusher.authenticateUser(socketId, user);

  response.setHeader("Content-Type", "application/javascript");

  response.end(JSON.stringify(auth));
}

export interface CommandResponse {
  message: string;
}
