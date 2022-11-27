export class FormManager<T extends object> {
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

    const prompt = this.form.prompts[key]

    if (typeof prompt.default == "string") {
      ;(this.form.responses[key] as string) = text
    }

    if (typeof prompt.default == "boolean") {
      ;(this.form.responses[key] as boolean) = text === "y"
    }

    this.fillIndex++
  }

  getPrompt(): PromptInfo<T[keyof T]> {
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

export interface PromptInfo<T> {
  default: T
  prompt: string
  placeholder: string
}

export interface FormOf<T extends object> {
  title: string
  prompts: {
    [Property in keyof T]: PromptInfo<T[Property]>
  }
  responses: T
}
