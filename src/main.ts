import { settings } from "../roms/carnival.json"
import { sendCommand } from "../lib/client"
import Pusher from "pusher-js"
import {
  Channels,
  Events,
  BroadcastMessage,
  KEY,
  CLUSTER,
} from "../lib/pusher/pusher.core"
import { prepend } from "../lib/engine/narative"

const commandLine = document.getElementById("command_line")
const form = document.getElementById("form")
const log = document.getElementById("console")
const pre = document.getElementById("prepend")
const image = document.getElementById("image")

if (image) {
  const src = settings["background-url"]
  ;(image as HTMLImageElement).src = src
}

if (pre) {
  pre.innerText = settings.prepend
}

// var user = prompt("who's there?");

var pusher = new Pusher(KEY, {
  cluster: CLUSTER,
  enabledTransports: ["ws", "wss", "xhr_streaming", "xhr_polling"],
  userAuthentication: {
    endpoint: "/api/auth",
    transport: "ajax",
    // params: { username: user },
  },
})

var channel = pusher.subscribe(Channels.BROADCAST)
channel.bind(Events.MESSAGE, function (data: BroadcastMessage) {
  writeLine(data.message)
})

// pusher.signin();

sendCommand("welcome").then((x) => writeLine(x))

const getCommandLineValue = () => {
  if (commandLine) {
    return (commandLine as HTMLInputElement).value.trim().toLowerCase()
  }
}

const setCommandLineValue = (text: string) => {
  if (commandLine) {
    ;(commandLine as HTMLInputElement).value = text
  }
}

const logText = (x: string) => {
  let p = document.createElement("p")
  p.innerText = x
  if (log) {
    log.appendChild(p)
  }
}

const smoothScrollWindow = (px: number) => {
  window.scrollBy({
    top: px, // could be negative value
    left: 0,
    behavior: "smooth",
  })
}

const writeLine = (string: string) => {
  logText(string)
  smoothScrollWindow(500)
}

if (form) {
  form.onsubmit = async (e) => {
    e.preventDefault()

    let input = getCommandLineValue()

    if (!input || input.length === 0) {
      return
    }

    writeLine(prepend(settings.prepend)(input))
    setCommandLineValue("")

    const res = await sendCommand(input)

    writeLine(res)
  }
}
