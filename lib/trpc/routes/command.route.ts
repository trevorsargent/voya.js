import { z } from "zod"
import { processAction } from "../../engine/engine"
import { build } from "../../utils/action.utils"
import { sanitizeBasic } from "../../utils/string.utils"
import { procedure } from "../trpc.base"

export const command = procedure
  .input(
    z.object({
      command: z.string(),
      playerId: z.string().nullable(),
    })
  )
  .mutation(async ({ input }) => {
    const sanitized = sanitizeBasic(input.command)
    const playerId = input.playerId

    const action = build(sanitized)

    const reply = await processAction(action, playerId)

    return {
      reply,
    }
  })
