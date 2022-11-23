import Surreal from "surrealdb.js"

export interface Player {
  id: string
  currentLocation: string
  locationHistory: string[]
  pockets: Record<string, number>
  height: number
  settings: {
    lamps?: string[]
  }
  [index: string]: unknown
}
