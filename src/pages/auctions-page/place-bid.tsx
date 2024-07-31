import { FunctionComponent, useRef } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@chakra-ui/react'
import { Auction } from 'auctions-core'

import { BidModal } from './bid-modal'

export const PlaceBid: FunctionComponent<{ auction: Auction }> = ({ auction }) => {
  const { user } = useAuth0()
  const bidModalRef = useRef<BidModal.Ref>({
    onOpen: () => { throw new Error('BidModal ref not found')},
  })

  const { seller, highestBid } = auction
  let bidState = 'CAN_BID'

  if (seller === user?.email) {
    bidState = 'OWN_AUCTION'
  }
  if (highestBid.bidder === user?.email) {
    bidState = 'HIGHEST_BIDDER'
  }

  return (
    <>
      <BidModal ref={bidModalRef} auction={auction} />
      { (bidState === 'OWN_AUCTION' || bidState === 'HIGHEST_BIDDER') && (
        <Button
          isDisabled
          variant={'auctions'}
          width={'100%'}
          borderWidth={0}
          color={'white'}
        >
          {bidState === 'OWN_AUCTION' ? 'This is your auction' : 'You are the highest bidder'}
        </Button>
      )}
      { bidState === 'CAN_BID' && (
        <Button
          variant={'auctions'}
          width={'100%'}
          borderWidth={0}
          color={'white'}
          onClick={() => bidModalRef.current.onOpen()}
        >
          Place Bid
        </Button>
      )}
    </>
  )
}
