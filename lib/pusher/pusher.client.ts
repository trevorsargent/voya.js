import Pusher from "pusher-js"
import { CLUSTER, KEY } from "./pusher.core"

export class PusherClient {
  client?: Pusher

  login(username: string) {
    this.client = new Pusher(KEY, {
      cluster: CLUSTER,
      enabledTransports: ["ws", "wss", "xhr_streaming", "xhr_polling"],
      userAuthentication: {
        endpoint: "/api/auth",
        transport: "ajax",
        params: { username },
      },
    })
  }

  bindChannel<T>(info: PusherBindingInfo, onUpdate: (t: T) => void): void {
    if (!this.client) {
      throw new Error("Sign In to Pusher before binding a channel")
    }

    this.client.subscribe(info.channel).bind(info.event, onUpdate)
  }
}

export interface PusherBindingInfo {
  channel: string
  event: string
}
