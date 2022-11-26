import type { CommandRequest, CommandResponse } from "../api/command"

export async function sendCommand(
  username: string | null,
  command: string
): Promise<string> {
  if (!username) {
    return "you must be logged in to do that"
  }

  return fetch(`/api/command`, {
    method: "POST",
    body: JSON.stringify({ command, username } as CommandRequest),
  })
    .then((x) => x.json().then((x: CommandResponse) => x.message))
    .catch((e) => "something went wrong")
}
