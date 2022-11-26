export class InputManager {
  constructor(
    private defaultInputHandler: (text: string) => Promise<void>,
    private onOutput: (text: string) => void,
    private setPrompt: (prompt: PromptInfo) => void,
    private hooks: Record<string, (text: string) => void>
  ) {}

  private onResetFunc?: () => void
  private formManager?: FormManager<any>

  fillForm<T extends object>(
    form: FormOf<T>,
    onComplete: (responses: T) => void
  ) {
    this.onOutput(form.title)
    this.formManager = new FormManager(form, onComplete)
    this.setPrompt(this.formManager.getPrompt())
  }

  async input(inputText: string) {
    const hook = this.hooks[inputText]
    if (hook) {
      return hook(inputText)
    }

    if (this.formManager) {
      this.formManager.fillNext(inputText)
      if (this.formManager.isComplete) {
        this.formManager.submit()
        delete this.formManager
        this.reset()
      } else {
        this.setPrompt(this.formManager.getPrompt())
      }
      return
    }
    await this.defaultInputHandler(inputText)
  }

  onReset(func: () => void) {
    this.onResetFunc = func
  }

  private reset() {
    if (this.onResetFunc) {
      this.onResetFunc()
    }
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
