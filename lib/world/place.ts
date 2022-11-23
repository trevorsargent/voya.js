export interface Place {
  name: string
  items?: Record<string, number>
  ahead?: string
  behind?: string
  left?: string
  right?: string
  above?: string
  below?: string

  isLocked?: boolean
  exchanges?: any
  settings?: {
    isRide?: boolean
    passiveKey?: string
    isGame?: boolean
    prize?: string
    canClimb?: boolean
    isDark?: boolean
    isLit?: boolean
  }
  messages?: {
    passiveKeySuccess?: string
    passiveKeyFailure?: string
    newText?: string
    rideText?: string
    playText?: string
  }
}
