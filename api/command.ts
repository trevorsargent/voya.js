import type { VercelRequest, VercelResponse } from "@vercel/node";
import { build } from "../lib/engine/actions";
import { act } from "../lib/engine/engine";
import { sanitizeBasic } from "../lib/engine/operative";
import { getClient } from "../lib/surreal/surreal.client";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const body: CommandRequest = JSON.parse(request.body);

  const sanitized = sanitizeBasic(body.command);

  const action = build(sanitized);

  const reply = act(action);

  const res: CommandResponse = {
    message: reply,
  };

  await getClient();

  return response.end(JSON.stringify(res));
}

export interface CommandResponse {
  message: string;
}

export interface CommandRequest {
  command: string;
}
