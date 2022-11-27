export enum Channels {
  BROADCAST = "broadcast",
}

export enum Events {
  MESSAGE = "message",
}

export interface BroadcastMessage {
  date: Date
  message: string
}

export const KEY = "677cfad59abacdcef733"
export const CLUSTER = "us3"
