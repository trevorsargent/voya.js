import Pusher from "pusher";
import { BroadcastMessage, Channels, Events } from "./pusher.core";

export async function broadcast(message: string) {
  const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID!,
    key: process.env.PUSHER_APP_KEY!,
    secret: process.env.PUSHER_APP_SECRET!,
    cluster: process.env.PUSHER_APP_CLUSTER!,
    useTLS: true,
  });

  const msg: BroadcastMessage = {
    message,
    date: new Date(),
  };

  await pusher.trigger(Channels.BROADCAST, Events.MESSAGE, msg);
}
