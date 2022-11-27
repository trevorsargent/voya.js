import { FormOf } from "../game/game"
import { Player } from "../models/player"

export const loginForm: FormOf<Pick<Player, "username">> = {
  title: "who's playing?",
  prompts: {
    username: {
      prompt: "username",
      placeholder: "what should we call you?",
    },
  },
  responses: {
    username: "",
  },
}
