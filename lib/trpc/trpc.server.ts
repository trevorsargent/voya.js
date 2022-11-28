import { initTRPC } from "@trpc/server"
import { command } from "./routes/command.route"
import { login } from "./routes/login.route"
import { signup } from "./routes/signup.route"

import { router } from "./trpc.base"

export const appRouter = router({
  auth: router({
    login,
    signup,
  }),
  command: command,
})

export type AppRouter = typeof appRouter
