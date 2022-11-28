import { createTRPCProxyClient, httpBatchLink } from "@trpc/client"
import type { AppRouter } from "./trpc.server"

export const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${window.location.origin}/api/trpc`,
      maxURLLength: 2083,
    }),
  ],
})
