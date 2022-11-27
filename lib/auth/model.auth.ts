export interface AuthStore {
  username: string | null
  setAuth: (username: string) => void
  logout: () => void
}
