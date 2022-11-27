import { createTRPCProxyClient, httpBatchLink } from "@trpc/client"
import {} from "@trpc/server"

import type { AppRouter } from "../../api/trpc/[trpc]"

export const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({ url: `http://localhost/api/trpc`, maxURLLength: 2083 }),
  ],
})
