import { Outlet } from 'react-router-dom'
import { Box } from '@chakra-ui/react'

import { useSafeContext } from '../../hooks/use-safe-context'
import { StoresContext } from '../../stores/stores.context'
import { LoadingSpinner } from './loading-spinner'
import { NavBar } from './nav-bar'

export const Layout = () => {
  const { overlayStore } = useSafeContext(StoresContext)
  return (
    <Box height={'100%'}>
      <LoadingSpinner display={overlayStore.displaySpinner} />
      <header>
        <NavBar />
      </header>
      <Outlet />
    </Box>
  )
}