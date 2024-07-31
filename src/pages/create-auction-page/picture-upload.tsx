import { ChangeEvent, useRef, useState } from 'react'
import { Box, IconButton, Img, Input } from '@chakra-ui/react'
import { DownloadIcon } from '@chakra-ui/icons'

export const PictureSelect = () => {
  const input = useRef<HTMLInputElement | null>(null)
  const pictureBase64 = useRef<HTMLInputElement | null>(null)
  const preview = useRef<HTMLImageElement | null>(null)
  const [hasPicture, setHasPicture] = useState(false)

  const reader = new FileReader()
  reader.onload = () => {
    if (!!preview.current?.src || !!pictureBase64.current?.value)
      return

    const res = reader.result as string
    preview.current!.src = res
    pictureBase64.current!.value = res

    setHasPicture(true)
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files
    if (files?.length)
      reader.readAsDataURL(files[0])
  }

  return (
    <>
      <Input
        ref={input}
        type='file'
        display='none'
        onChange={handleFileChange}
      />
      <Input
        ref={pictureBase64}
        type='text'
        name='pictureBase64'
        display='none'
      />
      <Box
        width={'100%'}
        minHeight={'100px'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        border={'2px dashed #a1a1a1'}
        borderRadius={'5px'}
        cursor={'copy'}
        onClick={() => input.current?.click()}
      >
        <Img
          ref={preview}
          alt='Auction'
          display={hasPicture ? 'initial' : 'none'}
        />
        <IconButton
          aria-label=''
          width={'100%'}
          minHeight={'100px'}
          display={hasPicture ? 'none' : 'initial'}
          icon={<DownloadIcon />}
        />
      </Box>
    </>
  )
}
