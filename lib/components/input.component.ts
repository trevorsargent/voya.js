import { InputManager } from "../input/input.manager"

export class InputComponent {
  constructor(
    private input: HTMLInputElement,
    private prompt: HTMLElement,
    manager: InputManager,
    private options: {
      promptPrepend: string
      defaultPlaceholder: string
    }
  ) {
    input.addEventListener("change", async (e) => {
      const text = (e.target as HTMLInputElement)?.value
      this.clearInput()
      await manager.input(text)
    })

    manager.onReset(() => {
      this.resetPrompt()
      this.resetPlaceholder()
    })

    this.resetPlaceholder()
    this.resetPrompt()
  }

  clearInput() {
    this.input.value = ""
  }

  setPrompt(text: string) {
    this.prompt.innerText = `${text} ${this.options.promptPrepend}`
  }

  setPlaceholder(text: string) {
    this.input.placeholder = text
  }

  private resetPrompt() {
    this.prompt.innerText = this.options.promptPrepend
  }

  private resetPlaceholder() {
    this.input.placeholder = this.options.defaultPlaceholder
  }
}
