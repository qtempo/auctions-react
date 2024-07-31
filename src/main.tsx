import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import { ChakraProvider } from '@chakra-ui/react'

import { StoresProvider } from './stores/stores.context'
import { theme } from './theme'
import { App } from './app'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoresProvider>
      <Auth0Provider
        domain={import.meta.env.VITE_AUTH0_DOMAIN}
        clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
        authorizationParams={{ redirect_uri: window.location.origin }}
      >
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </Auth0Provider>
    </StoresProvider>
  </StrictMode>,
)