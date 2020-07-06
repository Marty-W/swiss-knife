import React from 'react'
import styled from 'styled-components/macro'
import { useHistory } from 'react-router-dom'
import { GiSwissArmyKnife } from 'react-icons/gi'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import { auth } from '../../firebase/firebase'

import Button from './Button.styles'
import { useCurrentUser } from '../../context/AuthContext'

const Header: React.FC = () => {
  const currentUser = useCurrentUser()
  const history = useHistory()

  const signOutUser = async () => {
    try {
      await auth.signOut()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Wrapper>
      <Knife />
      <ButtonWrapper>
        <Hint />
        {currentUser ? (
          <LoginButton onClick={signOutUser}>Sign out</LoginButton>
        ) : (
          <LoginButton onClick={() => history.push('/auth')}>
            Sign in
          </LoginButton>
        )}
      </ButtonWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  grid-area: head;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5em;
`

const Knife = styled(GiSwissArmyKnife)`
  transform: rotate(-45deg);
  color: ${(props) => props.theme.colors.accent};
  width: 1.8em;
  font-size: 2rem;
`

const Hint = styled(AiOutlineQuestionCircle)`
  fill: ${(props) => props.theme.colors.accent};
  font-size: 1.3rem;
`

const ButtonWrapper = styled.div``

const LoginButton = styled(Button)`
  border: 1px solid ${(props) => props.theme.colors.accent};
  padding: 0.5rem 1rem;
  margin-left: 1em;
`

//TODO add hint handle for info about features

export default Header
