import { initTRPC } from "@trpc/server"

var t = initTRPC.create()

export const procedure = t.procedure

export const router = t.router
