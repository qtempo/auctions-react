import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useAuth0 } from '@auth0/auth0-react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import { useSafeContext } from './hooks/use-safe-context'
import { StoresContext } from './stores/stores.context'

import { AuthenticationGuard } from './pages/common/authentication-guard'
import { Layout } from './pages/common/layout'
import { LoadingSpinner } from './pages/common/loading-spinner'

import { ErrorPage } from './pages/error.page'
import { AuctionsPage } from './pages/auctions.page'
import { AuctionsList } from './pages/auctions-page/auctions-list'
import { CreateAuctionPage } from './pages/create-auction.page'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthenticationGuard component={Layout} /> ,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        Component: () => {
          const { isAuthenticated } = useAuth0()
          return isAuthenticated
            ? <Navigate replace to='/auctions' />
            : null
        },
      },
      {
        path: '/auctions',
        element: <AuctionsPage />,
        children: [
          {
            index: true,
            element: <AuctionsList />,
          },
          {
            path: '/auctions/create',
            element: <CreateAuctionPage />,
          },
        ],
      },
    ],
  },
])

export const App = observer(() => {
  const { isLoading, error, isAuthenticated, getIdTokenClaims } = useAuth0()
  const [ isTokenSealed, sealToken ] = useState(false)
  const { authStore } = useSafeContext(StoresContext)

  useEffect(() => {
    if (isAuthenticated) {
      getIdTokenClaims().then(token => {
        if (!token)
          throw new Error('Enable to get token . . .')
        authStore.setToken(token.__raw)
        sealToken(true)
      })
    }
  }, [isAuthenticated])

  if (isLoading) {
    return <LoadingSpinner display={true} />
  }

  if (error) {
    return <div>Oops... {error.message}</div>
  }

  if (isAuthenticated && !isTokenSealed) {
    return <LoadingSpinner display={true} />
  }

  return (
    <RouterProvider router={router} />
  )
})