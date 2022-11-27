import { settings } from "../roms/carnival.json"
import { Game } from "../lib/game/game"
import { InputComponent } from "../lib/components/input.component"
import { ConsoleComponent } from "../lib/components/console.component"
import { LocalStorageAuth } from "../lib/auth/localstorage.auth"

const commandLine = document.getElementById("command_line") as HTMLInputElement
const log = document.getElementById("console")
const pre = document.getElementById("prepend")
const image = document.getElementById("image") as HTMLImageElement

if (!image) {
  throw new Error("Need Log Output")
}

if (!log) {
  throw new Error("Need Log Output")
}

if (!pre) {
  throw new Error("Need Prompt Prepend Object")
}

if (!commandLine) {
  throw new Error("Need Prompt Command Line Object")
}

const output = new ConsoleComponent(log, image)

const input = new InputComponent(commandLine, pre, {
  defaultPlaceholder: "type a command... ('help' if you're stuck)",
  promptPrepend: settings.prepend,
})

const auth = new LocalStorageAuth()

new Game(input, output, auth)
