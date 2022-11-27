import { AuthStore } from "./model.auth"

export class LocalStorageAuth implements AuthStore {
  private PLAYER_ID_KEY = "voya-js-playerid"
  private _playerId: string | null

  get playerId() {
    this._playerId = this._playerId ?? localStorage.getItem(this.PLAYER_ID_KEY)
    return this._playerId
  }

  setAuth(playerId: string): void {
    this._playerId = playerId
    localStorage.setItem(this.PLAYER_ID_KEY, playerId)
  }
  logout() {
    this._playerId = null
    localStorage.removeItem(this.PLAYER_ID_KEY)
  }

  constructor() {
    this._playerId = this.playerId
  }
}
