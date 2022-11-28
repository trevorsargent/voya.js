import { createNextApiHandler } from "@trpc/server/adapters/next"
import { appRouter } from "../../lib/trpc/trpc.server"

export default createNextApiHandler({
  router: appRouter,
})
