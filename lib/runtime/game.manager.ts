import { sendCommand, signin, signup } from "../api/api.client"
import { ConsoleComponent } from "../components/console.component"
import { InputComponent } from "../components/input.component"
import { loginForm } from "../forms/login.form"
import { AuthStore } from "../auth/model.auth"
import { confirmForm } from "../forms/confim.form"
import { FormManager, FormOf } from "./form.manager"
import { settings } from "../content/settings"

export class GameManager {
  constructor(
    private input: InputComponent,
    private output: ConsoleComponent,
    private auth: AuthStore
  ) {
    input.onInput(this.processInput.bind(this))
    output.WriteLine("\n\n\n\n\n\n\n")
    this.intercept.login()
  }

  private welcome = () =>
    sendCommand(this.auth.playerId, "welcome").then((x) => {
      this.output.WriteLine(x)
    })

  private intercept = {
    login: async (): Promise<void> => {
      if (this.auth.playerId) {
        this.welcome()
        return
      }

      const loginInfo = await this.fillForm(loginForm)
      const signInResponse = await signin(loginInfo.username)
      this.output.WriteLine(signInResponse.message)
      if (signInResponse.success) {
        this.auth.setAuth(signInResponse.playerId)
        return this.intercept.login()
      }
      const resp = await this.fillForm(
        confirmForm(`signup as ${loginInfo.username}?`, true)
      )
      if (resp.confirm) {
        this.intercept.signup(loginInfo.username)
      } else {
        this.output.WriteLine("ok. you can sign up later")
      }
    },
    logout: (_: string) => {
      this.auth.logout()
      this.output.WriteLine("logged out. see you later")
    },
    signup: async (username: string | null) => {
      const uname = username ?? (await this.fillForm(loginForm)).username

      const signUpResponse = await signup(uname)
      this.output.WriteLine(signUpResponse.message)
      if (signUpResponse.success) {
        this.auth.setAuth(signUpResponse.playerId)
        this.intercept.login()
      }
    },
  }

  private formManager?: FormManager<any>

  private fillForm<T extends object>(form: FormOf<T>): Promise<T> {
    this.output.WriteLine(form.title)
    return new Promise((res, rej) => {
      this.formManager = new FormManager(form, res)
      this.input.setPrompt(this.formManager.getPrompt())
    })
  }

  async processInput(inputText: string) {
    // intercept messages to the server

    if (Object.hasOwn(this.intercept, inputText)) {
      this.output.WriteLine(settings.prepend, inputText)
      const intercept = Reflect.get(this.intercept, inputText)
      return intercept(inputText)
    }

    // intercept input if there's a form being filled out
    if (this.formManager) {
      this.formManager.fillNext(inputText)
      if (this.formManager.isComplete) {
        this.formManager.submit()
        delete this.formManager
        this.input.resetPrompt()
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
}
