import { AuthStore } from "./model.auth"

export class LocalStorageAuth implements AuthStore {
  private LS_USER_KEY = "voya-js-username"
  private _username: string | null

  get username() {
    this._username = this._username ?? localStorage.getItem(this.LS_USER_KEY)
    return this._username
  }

  setAuth(username: string): void {
    this._username = username
    localStorage
  }
  logout() {
    this._username = null
    localStorage.removeItem(this.LS_USER_KEY)
  }

  constructor() {
    this._username = this.username
  }
}
