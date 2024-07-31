import { observer } from 'mobx-react-lite'
import { useAuth0 } from '@auth0/auth0-react'
import { styled } from 'styled-components'
import { IconButton, useTheme } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'

const NavBarComponent = styled.div<{ $gradient: string; }>`
  width: 100%;
  margin-bottom: 24px;
  padding: 14px;
  display: flex;
  box-sizing: border-box;
  background: ${props => props.$gradient};
`

const Header = styled.div`
  display: flex;
  align-items: center;
  flex-basis: 50%;
`

const AuthContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-basis: 50%;
`

export const NavBar = observer(() => {
  const { logout, isAuthenticated } = useAuth0()
  const { colors } = useTheme()
  const gradient = colors['auctions-gradient']

  return (
    <NavBarComponent $gradient={gradient}>
      <Header>
        <h1 style={{ fontSize: 14, color: 'white' }}>THE AUCTION HOUSE</h1>
      </Header>
      <AuthContainer>
        {isAuthenticated && (
          <IconButton
            title='Sign Out'
            isRound={true}
            variant='outline'
            colorScheme='teal'
            aria-label='Done'
            fontSize='20px'
            icon={<ArrowForwardIcon />}
            onClick={() => logout({})}
          />
        )}
      </AuthContainer>
    </NavBarComponent>
  )
})