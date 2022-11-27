import type { CommandRequest, CommandResponse } from "../../api/command"
import { SigninResponse, SigninRequest } from "../../api/signin"
import { SignupRequest, SignupResponse } from "../../api/signup"

export async function sendCommand(
  playerId: string | null,
  command: string
): Promise<string> {
  const req: CommandRequest = {
    command,
    playerId,
  }

  return fetch(`/api/command`, {
    method: "POST",
    body: JSON.stringify(req),
  })
    .then((x) => x.json().then((x: CommandResponse) => x.message))
    .catch((e) => "something went wrong")
}

export async function signup(username: string): Promise<SignupResponse> {
  return fetch(`/api/signup`, {
    method: "POST",
    body: JSON.stringify({ username } as SignupRequest),
  })
    .then((x) => x.json())
    .catch((e) => ({ success: false, message: "something went wrong" }))
}

export async function signin(username: string): Promise<SigninResponse> {
  return fetch(`/api/signin`, {
    method: "POST",
    body: JSON.stringify({ username } as SigninRequest),
  })
    .then((x) => x.json())
    .catch((e) => ({ success: false, message: "something went wrong" }))
}
