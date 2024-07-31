import { FunctionComponent, RefObject, useActionState, useImperativeHandle } from 'react'
import { observer } from 'mobx-react-lite'
import { Auction } from 'auctions-core'
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'

import { useSafeContext } from '../../hooks/use-safe-context'
import { StoresContext } from '../../stores/stores.context'

export namespace BidModal {
  export interface Ref {
    onOpen: () => void
  }
}

export const BidModal: FunctionComponent<{
  ref: RefObject<BidModal.Ref>
  auction: Auction,
}> = observer(({ ref, auction }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { auctionsStore } = useSafeContext(StoresContext)

  useImperativeHandle(ref, () => ({
    onOpen,
  }))

  const [error, submitAction, isPending] = useActionState<Error | void, FormData>(
    async (_, formData) => {
      const amount = parseInt(formData.get('amount') as string)
      if (isNaN(amount))
        return new Error('Provide a valid number')

      await auctionsStore.placeBid(auction.id, amount)
      onClose()
    },
    void 0,
  )

  if (!auction) {
    return null
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Bid on "{auction.title}"</ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          <form id='bid-modal-form' action={submitAction}>
            <FormControl isInvalid={!!error}>
              <FormLabel>Bid Amount</FormLabel>
              <Input name='amount' type='number' min={auction.highestBid.amount} />
              {!!error && (<FormErrorMessage>{error?.message}</FormErrorMessage>)}
            </FormControl>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button type='submit' form='bid-modal-form' isDisabled={isPending}>
            Place Bid
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
})