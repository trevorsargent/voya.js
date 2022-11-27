import { FormOf } from "../runtime/form.manager"

export const confirmForm = (
  prompt: string,
  def: boolean = false
): FormOf<{ confirm: boolean }> => {
  return {
    title: prompt,
    prompts: {
      confirm: {
        default: def,
        placeholder: "y/n",
        prompt: "yes or no?",
      },
    },

    responses: {
      confirm: def,
    },
  }
}
