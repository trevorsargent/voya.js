import type { CommandRequest, CommandResponse } from "../api/command";

export async function sendCommand(command: string): Promise<string> {
  console.log(command);
  return fetch(`/api/command`, {
    method: "POST",
    body: JSON.stringify({ command } as CommandRequest),
  })
    .then((x) => x.json())
    .then((x: CommandResponse) => x.message);
}
