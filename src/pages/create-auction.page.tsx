import { useActionState } from 'react'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  StackDivider,
  VStack,
} from '@chakra-ui/react'

import { useSafeContext } from '../hooks/use-safe-context'
import { StoresContext } from '../stores/stores.context'
import { PictureSelect } from './create-auction-page/picture-upload'

class CreateError extends Error {
  #fields: {
    title?: 'Title not valid'
    picture?: 'Picture must be provided'
  } = {}

  get fields() {
    return this.#fields
  }

  setTitleError() {
    this.#fields.title = 'Title not valid'
  }

  setPictureError() {
    this.#fields.picture = 'Picture must be provided'
  }
}

export const CreateAuctionPage = observer(() => {
  const navigate = useNavigate()
  const { auctionsStore } = useSafeContext(StoresContext)

  const [error, submitAction, isPending] = useActionState<CreateError | void, FormData>(
    async (_, formData) => {
      const error = new CreateError()
      const title = formData.get('title') as string
      const pictureBase64 = formData.get('pictureBase64') as string

      if (typeof title !== 'string' || !title.length)
        error.setTitleError()

      if (typeof pictureBase64 !== 'string' || !pictureBase64.length)
        error.setPictureError()

      if (error.fields.title || error.fields.picture)
        return error

      await auctionsStore.createAuction(title, pictureBase64)
      navigate('/auctions')
    },
    void 0,
  )

  return (
    <Container>
      <VStack align='stretch' maxWidth={'400px'} spacing={4} divider={<StackDivider borderColor='gray.200' />}>
        <Heading mb={''} size={'lg'} textAlign={'center'} color={'blackAlpha.700'}>
          Create an Auction
        </Heading>

        <form noValidate autoComplete='off' action={submitAction}>
          <VStack spacing={4}>
            <FormControl isInvalid={!!error && !!error.fields.title}>
              <Input name='title' type='text' placeholder='Title' borderColor={'blackAlpha.700'}/>
              {!!error && !!error.fields.title && (<FormErrorMessage>{error.fields.title}</FormErrorMessage>)}
            </FormControl>

            <FormControl isInvalid={!!error && !!error.fields.picture}>
              <PictureSelect />
              {!!error && !!error.fields.picture && (<FormErrorMessage>{error.fields.picture}</FormErrorMessage>)}
            </FormControl>

            <Button type='submit' width='100%' variant={'auctions'} isDisabled={isPending}>
              Create
            </Button>
          </VStack>
        </form>
      </VStack>
    </Container>
  )
})
