import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Box, Flex, IconButton } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

import { useSafeContext } from '../../hooks/use-safe-context'
import { StoresContext } from '../../stores/stores.context'
import { Auction } from './auction'

export const AuctionsList = observer(() => {
  const { auctionsStore } = useSafeContext(StoresContext)
  const { auctions } = auctionsStore

  useEffect(() => {
    const timer = auctionsStore.fetchingAuctions()
    return () => {
      auctionsStore.stopFetchingAuctions(timer)
    }
  }, [])


  if (!auctions.length) {
    return (
      <div style={{ textAlign: 'center', width: '100%' }}>
        <h4>No auctions available.</h4>
      </div>
    )
  }

  return (
    <>
      <Flex flexWrap={'wrap'} gap={'5%'}>
        {auctions.map(auction => (
          <Box key={auction.id} marginBottom={'30px'} flexBasis={'30%'}>
            <Auction auction={auction} />
          </Box>
        ))}
      </Flex>
      <Box position={'fixed'} bottom={'20px'} right={'20px'}>
        <NavLink to='/auctions/create'>
          <IconButton
            variant='auctions'
            aria-label='Done'
            width='3rem'
            height='3rem'
            fontSize='20px'
            color='white'
            isRound={true}
            icon={<AddIcon />}
          />
        </NavLink>
      </Box>
    </>
  )
})