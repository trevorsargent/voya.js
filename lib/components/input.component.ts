import { PromptInfo } from "../runtime/game.manager"

export class InputComponent {
  constructor(
    private input: HTMLInputElement,
    private prompt: HTMLElement,
    private options: {
      promptPrepend: string
      defaultPlaceholder: string
    }
  ) {
    input.addEventListener("change", async (e) => {
      const text = (e.target as HTMLInputElement)?.value
      this.clearInput()
      if (this.inputFunc) {
        this.inputFunc(text)
      }
    })

    this.resetPrompt()
  }

  private inputFunc?: (text: string) => void

  clearInput() {
    this.input.value = ""
  }

  setPrompt(text: PromptInfo) {
    this.prompt.innerText = `${text.prompt} ${this.options.promptPrepend}`
    this.input.placeholder = text.placeholder ?? this.options.defaultPlaceholder
  }

  onInput(inputFunc: (text: string) => void) {
    this.inputFunc = inputFunc
  }

  resetPrompt() {
    this.prompt.innerText = this.options.promptPrepend
    this.input.placeholder = this.options.defaultPlaceholder
  }
}
