import { extendTheme, defineStyleConfig } from '@chakra-ui/react'

const gradient = 'linear-gradient(90deg, rgba(190,52,32,1) 0%, rgba(231,75,77,1) 48%, rgba(231,148,74,1) 100%)'

const Button = defineStyleConfig({
  variants: {
    auctions: {
      color: 'white',
      background: gradient,
      _hover: {
        opacity: '.7',
        _disabled: {
          opacity: '.5',
          background: gradient,
        },
      },
      _disabled: {
        opacity: '.5',
      },
    },
  },
})

export const theme = extendTheme({
  styles: {
    global: {
      'body': {
        background: 'gray.100',
      },
    },
  },
  colors: {
    'auctions-gradient': gradient,
  },
  components: {
    Button,
  },
})