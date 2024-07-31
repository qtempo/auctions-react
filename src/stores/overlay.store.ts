import { action, makeObservable, observable} from 'mobx'

export class OverlayStore {
  displaySpinner = false

  constructor() {
    makeObservable(this, {
      displaySpinner: observable,
      setLoadingSpinner: action,
    })
  }

  setLoadingSpinner(status: boolean): void {
    this.displaySpinner = status
  }
}

export const overlayStore = new OverlayStore()
