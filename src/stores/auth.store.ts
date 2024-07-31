import { observable, action, makeObservable } from 'mobx'

export class AuthStore {
  token = ''

  constructor() {
    makeObservable(this, {
      token: observable,
      setToken: action,
    })
  }

  setToken(token: string) {
    this.token = token
  }
}

export const authStore = new AuthStore()
