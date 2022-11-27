import { Player } from "../models/player"
import { FormOf } from "../runtime/form.manager"

export const loginForm: FormOf<Pick<Player, "username">> = {
  title: "who's playing?",
  prompts: {
    username: {
      default: "",
      prompt: "username",
      placeholder: "what should we call you?",
    },
  },
  responses: {
    username: "",
  },
}
