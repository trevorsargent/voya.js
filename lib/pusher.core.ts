export enum Channels {
  BROADCAST = "broadcast",
}

export enum Events {
  MESSAGE = "message",
}

export interface BroadcastMessage {
  date: Date;
  message: string;
}
