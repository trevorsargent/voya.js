export interface AuthStore {
  playerId: string | null
  setAuth: (playerId: string) => void
  logout: () => void
}
