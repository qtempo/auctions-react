import { createContext, FunctionComponent, PropsWithChildren } from 'react'
import { overlayStore, OverlayStore } from './overlay.store'
import { authStore, AuthStore } from './auth.store'
import { auctionsStore, AuctionsStore } from './auctions.store'

interface Stores {
  overlayStore: OverlayStore
  authStore: AuthStore
  auctionsStore: AuctionsStore
}

export const StoresContext = createContext<Stores | undefined>(undefined)

export const StoresProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <StoresContext value={{
      overlayStore,
      authStore,
      auctionsStore,
    }}>
      {children}
    </StoresContext>
  )
}