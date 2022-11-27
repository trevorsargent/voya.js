// @ts-nocheck
import type { VercelRequest, VercelResponse } from "@vercel/node"
import { getClient } from "../lib/surreal/surreal.client"
import JSON from "../roms/carnival.json"

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const wrap = (string) => `place:${string}`

  var goodPlaces = Object.entries(JSON.places).map(([key, value]) => ({
    ...value,
    id: wrap(key),
    ahead: value.ahead ? wrap(value.ahead) : undefined,
    behind: value.behind ? wrap(value.behind) : undefined,
    left: value.left ? wrap(value.left) : undefined,
    right: value.right ? wrap(value.right) : undefined,
    above: value.above ? wrap(value.above) : undefined,
    below: value.below ? wrap(value.below) : undefined,
  }))

  for (let place of goodPlaces) {
    ;(await getClient()).update(place.id, place)
  }

  return response.end()
}
