import { Outlet } from 'react-router-dom'
import { Container } from '@chakra-ui/react'

export const AuctionsPage = () => {
  return (
    <Container maxW='container.lg'>
      <Outlet />
    </Container>
  )
}
