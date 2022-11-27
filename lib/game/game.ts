import { sendCommand, signin, signup } from "../api/api.client"
import { ConsoleComponent } from "../components/console.component"
import { InputComponent } from "../components/input.component"
import { settings } from "../../roms/carnival.json"
import { loginForm } from "../forms/login.form"
import { AuthStore } from "../auth/model.auth"

export class Game {
  constructor(
    private input: InputComponent,
    private output: ConsoleComponent,
    private auth: AuthStore
  ) {
    input.onInput(this.processInput.bind(this))
    output.WriteLine("\n\n\n\n\n\n\n")
    this.processInput("login")
  }

  welcome = () =>
    sendCommand(this.auth.playerId, "welcome").then((x) => {
      this.output.WriteLine(x)
    })

  private intercept = {
    login: (_: string) => {
      if (this.auth.playerId) {
        this.welcome()
        return
      }

      this.fillForm(loginForm, (res) => {
        signin(res.username).then((r) => {
          this.output.WriteLine(r.message)
          if (r.success) {
            this.auth.setAuth(r.playerId)
          }
          this.intercept.login(_)
        })
      })
    },
    logout: (_: string) => {
      this.auth.logout()
    },
    signup: (_: string) => {
      this.fillForm(loginForm, (res) => {
        signup(res.username).then((r) => {
          this.output.WriteLine(r.message)
          if (r.success) {
            this.auth.setAuth(r.playerId)
            this.intercept.login(_)
          } else {
            this.intercept.signup(_)
          }
        })
      })
    },
  }

  private formManager?: FormManager<any>

  fillForm<T extends object>(
    form: FormOf<T>,
    onComplete: (responses: T) => void
  ) {
    this.output.WriteLine(form.title)
    this.formManager = new FormManager(form, onComplete)
    this.input.setPrompt(this.formManager.getPrompt())
  }

  async processInput(inputText: string) {
    // intercept messages to the server

    if (Object.hasOwn(this.intercept, inputText)) {
      const intercept = Reflect.get(this.intercept, inputText)
      return intercept(inputText)
    }

    // intercept input if there's a form being filled out
    if (this.formManager) {
      this.formManager.fillNext(inputText)
      if (this.formManager.isComplete) {
        this.formManager.submit()
        delete this.formManager
        this.resetInput()
      } else {
        this.input.setPrompt(this.formManager.getPrompt())
      }
      return
    }

    // otherwise send the input to the console, and process the command on the server
    this.output.WriteLine(settings.prepend, inputText)
    return sendCommand(this.auth.playerId, inputText)
      .catch((e) => e.message)
      .then((x) => this.output.WriteLine(x))
  }

  private resetInput() {
    this.input.resetPrompt()
  }
}

class FormManager<T extends object> {
  constructor(
    private form: FormOf<T>,
    public onComplete: (responses: T) => void
  ) {
    this.promptKeys = Object.keys(form.responses) as (keyof T)[]
  }
  private fillIndex = 0
  private promptKeys: (keyof T)[]

  fillNext(text: string) {
    var key = this.promptKeys[this.fillIndex]
    ;(this.form.responses[key] as string) = text
    this.fillIndex++
  }

  getPrompt(): PromptInfo {
    var key = this.promptKeys[this.fillIndex]
    const prompt = this.form.prompts[key]
    return prompt
  }

  submit() {
    this.onComplete(this.form.responses)
  }

  get isComplete(): boolean {
    return this.promptKeys.length === this.fillIndex
  }
}

export interface FillableForm<T extends Record<string, string>> {
  titlePrompt: string
  prompts: FormPrompt<T>[]
  response: T
}

export interface FormKey<T extends Record<string, string>> {
  id: keyof T
}

export interface PromptInfo {
  prompt: string
  placeholder: string | null
}

export type FormPrompt<T extends Record<string, string>> = FormKey<T> &
  PromptInfo

export interface FormOf<T extends object> {
  title: string
  prompts: Record<keyof T, PromptInfo>
  responses: T
}
