import { Auction, AuctionID } from 'auctions-core'

export class AuctionsService {
  readonly #apiEndpoint: string
  #token: string = ''

  constructor(apiEndpoint = import.meta.env.VITE_APP_AUCTIONS_ENDPOINT) {
    this.#apiEndpoint = apiEndpoint
  }

  setToken(token: string) {
    this.#token = token
  }

  async fetchByStatus(status: Auction['status']): Promise<Auction[]> {
    const response = await fetch(`${this.#apiEndpoint}/auctions?status=${status}`, {
      headers: {
        Authorization: `Bearer ${this.#token}`,
      },
    })
    return await response.json()
  }

  async placeBid(id: AuctionID, amount: number): Promise<Auction> {
    const response = await fetch(`${this.#apiEndpoint}/auctions/${id}/bid`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${this.#token}`,
      },
      body: JSON.stringify({ amount }),
    })
    return await response.json()
  }

  async persist(title: string): Promise<Auction> {
    const response = await fetch(`${this.#apiEndpoint}/auctions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.#token}`,
      },
      body: JSON.stringify({ title }),
    })
    return await response.json()
  }

  async persistAuctionPicture(id: AuctionID, pictureBase64: string): Promise<Auction> {
    const response = await fetch(`${this.#apiEndpoint}/auctions/${id}/picture`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${this.#token}`,
      },
      body: JSON.stringify({ pictureBase64 }),
    })
    return await response.json()
  }
}
