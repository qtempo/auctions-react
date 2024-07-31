import { FunctionComponent } from 'react'
import { styled } from 'styled-components'
import { Spinner } from '@chakra-ui/react'

const SpinnerContainer = styled.div<{ $displayValue: 'flex' | 'none' }>`
  display: ${props => props.$displayValue ?? 'flex'};
  width: 100vw;
  height: 100vh;
  position: fixed;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.2);
  z-index: 999;
`

export const LoadingSpinner: FunctionComponent<{ display: boolean }> = ({ display }) => {
  const displayValue = !!display ? 'flex' : 'none'
  return (
    <SpinnerContainer $displayValue={displayValue}>
      <Spinner size='xl' />
    </SpinnerContainer>
  )
}
