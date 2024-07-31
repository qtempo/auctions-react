import { action, makeObservable, observable, reaction, runInAction } from 'mobx'
import { Auction, AuctionID } from 'auctions-core'

import { authStore, AuthStore } from './auth.store'
import { OverlayStore, overlayStore } from './overlay.store'
import { AuctionsService } from './services/auctions.service'

export class AuctionsStore {
  readonly #authStore: AuthStore
  readonly #overlayStore: OverlayStore

  #auctionsService: AuctionsService
  auctions: Auction[] = []

  constructor(authStore: AuthStore, overlayStore: OverlayStore) {
    this.#authStore = authStore
    this.#overlayStore = overlayStore,
    this.#auctionsService = new AuctionsService()

    reaction(
      () => this.#authStore.token,
      token => this.#auctionsService.setToken(token),
    )

    makeObservable(this, {
      auctions: observable,
      placeBid: action,
    })
  }

  fetchingAuctions(): number {
    this.#fetchAuctionsOnce().finally()

    return setInterval(async () => {
      await this.#fetchAuctionsOnce()
    }, +import.meta.env.VITE_APP_REFRESH_RATE * 1000)
  }

  async #fetchAuctionsOnce(): Promise<void> {
    try {
      const auctions = await this.#auctionsService.fetchByStatus('OPEN')
      runInAction(() => {
        this.auctions = auctions
      })
    } catch (error) {
      console.error(error)
    }
  }

  stopFetchingAuctions(timer: number): void {
    clearInterval(timer)
  }

  async placeBid(id: AuctionID, amount: number) {
    this.#overlayStore.setLoadingSpinner(true)
    try {
      await this.#auctionsService.placeBid(id, amount)
      await this.#fetchAuctionsOnce()
    } catch (error) {
      console.error(error)
    }
    this.#overlayStore.setLoadingSpinner(false)
  }

  async createAuction(title: string, pictureBase64: string) {
    this.#overlayStore.setLoadingSpinner(true)
    try {
      const { id } = await this.#auctionsService.persist(title)
      await this.#auctionsService.persistAuctionPicture(id, pictureBase64)
    } catch (error) {
      console.error(error)
    }
    this.#overlayStore.setLoadingSpinner(false)
  }
}

export const auctionsStore = new AuctionsStore(authStore, overlayStore)