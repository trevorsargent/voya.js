export class InputManager {
  constructor(
    private defaultInputHandler: (text: string) => Promise<void>,
    private onOutput: (text: string) => void,
    private setPrompt: (prompt: FormPrompt) => void
  ) {}

  private onResetFunc?: () => void
  private formManager?: FormManager

  fillForm(
    form: FillableForm,
    onComplete: (responses: FormResponse[]) => void
  ) {
    this.onOutput(form.titlePrompt)
    this.formManager = new FormManager(form.prompts, onComplete)
    this.setPrompt(this.formManager.getPrompt())
  }

  async input(inputText: string) {
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

class FormManager {
  constructor(
    private prompts: FormPrompt[],
    public onComplete: (responses: FormResponse[]) => void
  ) {}

  private responses: FormResponse[] = []

  fillNext(text: string) {
    var currentField = this.prompts[this.responses.length]
    this.responses.push({ id: currentField.id, reply: text })
  }

  getPrompt() {
    return this.prompts[this.responses.length]
  }

  submit() {
    this.onComplete(this.responses)
  }

  get isComplete(): boolean {
    return this.responses.length === this.prompts.length
  }
}

export interface FillableForm {
  titlePrompt: string
  prompts: FormPrompt[]
}

export interface FormPrompt {
  id: string
  prompt: string
  placeholder?: string
}

export interface FormResponse {
  id: string
  reply: string
}
