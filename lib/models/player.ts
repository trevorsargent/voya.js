export interface Player {
  id: string
  username: string
  currentLocation: string
  locationHistory: string[]
  pockets: Record<string, number>
  height: number
  settings: {
    lamps?: string[]
  }
}
