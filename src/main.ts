import { settings } from "../roms/carnival.json"
import { sendCommand } from "../lib/client"
import { InputManager } from "../lib/input/input.manager"
import { InputComponent } from "../lib/components/input.component"
import { ConsoleComponent } from "../lib/components/console.component"
import { loginForm } from "../lib/forms/login.form"

const commandLine = document.getElementById("command_line") as HTMLInputElement
const log = document.getElementById("console")
const pre = document.getElementById("prepend")
const image = document.getElementById("image")

let username: string | null = null

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

const src = settings["background-url"]

;(image as HTMLImageElement).src = src

const output = new ConsoleComponent(log)

const inputManager = new InputManager(
  (text: string) => {
    return sendCommand(username, text)
      .catch((e) => e.message)
      .then((x) => output.WriteLine(x))
  },
  output.WriteLine.bind(output),
  ({ prompt, placeholder }) => {
    if (pre) {
      pre.innerText = `${prompt} >>`
      commandLine.placeholder = placeholder ?? ""
    }
  },
  {
    login: (_: string) => {
      inputManager.fillForm(loginForm, (res) => {
        username = res.username
        sendCommand(username, "welcome").then((x) => {
          output.WriteLine(x)
        })
      })
    },
  }
)

new InputComponent(commandLine, pre, inputManager, {
  defaultPlaceholder: "type a command... ('help' if you're stuck)",
  promptPrepend: settings.prepend,
})

output.WriteLine("\n\n\n\n\n\n\n")

inputManager.input("login")
