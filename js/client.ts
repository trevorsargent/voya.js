import { CommandResponse } from "../api/command";

export async function sendCommand(command: string): Promise<string> {
  return fetch(`/api/command?command=${command}`)
    .then((x) => x.json())
    .then((x: CommandResponse) => x.message);
}
