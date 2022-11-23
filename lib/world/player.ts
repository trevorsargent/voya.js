import { Place } from "./place"

export interface Player {
  currentLocation: Place
  locationHistory: string[]
  pockets: Record<string, number>
  height: number
  settings: {
    startingPlace: string
    lamps?: string[]
  }
}
