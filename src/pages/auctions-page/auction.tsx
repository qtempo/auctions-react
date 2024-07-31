import styled from 'styled-components'
import Countdown from 'react-countdown'
import {
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Stack,
  Image,
  Flex,
  CardHeader,
  Avatar,
  Box,
  Wrap,
} from '@chakra-ui/react'
import { Auction as AuctionType } from 'auctions-core'
import { PlaceBid } from './place-bid'

const Label = styled.p`
  font-size: 12px;
  font-weight: bold;
  color: #919191;
`

const Value = styled.span`
  font-size: 14px;
`

export const Auction = ({ auction }: { auction: AuctionType }) => {
  const pictureUrl = auction.pictureUrl || 'placeholder.png'
  const { amount } = auction.highestBid

  return (
    <Card maxW='sm'>
      <CardHeader>
        <Wrap spacing='2'>
          <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
            <Avatar size={'sm'} name={auction.seller[0].toUpperCase()} />
            <Box>
              <Heading size={'0.5em'}>{auction.seller}</Heading>
            </Box>
          </Flex>
        </Wrap>
      </CardHeader>

      <CardBody>
        <Image borderRadius='lg' alt={auction.title} src={pictureUrl} />
        <Stack mt='6' spacing='3'>
          <Heading as='h3' size='sm'>{auction.title}</Heading>
          <Flex>
            <Box flexBasis='50%' justifyContent='center' alignItems='center' textAlign='center'>
              <Value>{amount === 0 ? 'No bids' : `$${amount}`}</Value>
              <Label>HIGHEST BID</Label>
            </Box>
            <Box flexBasis='50%' justifyContent='center' alignItems='center' textAlign='center'>
              <Countdown
                date={auction.endingAt}
                renderer={({ hours, minutes, seconds }) => (
                  <Value>{hours}h {minutes}m {seconds}s</Value>
                )}
              />
              <Label>TIME REMAINING</Label>
            </Box>
          </Flex>
        </Stack>
      </CardBody>

      <Divider />

      <CardFooter>
        <PlaceBid auction={auction} />
      </CardFooter>
    </Card>
  )
}
