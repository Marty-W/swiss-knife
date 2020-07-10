import React from 'react'
import styled from 'styled-components'
import { AiOutlineClose } from 'react-icons/ai'

import { useHistory } from 'react-router-dom'

import Modal from '../components/UI/Modal'
import Form from '../components/authentication/Form'
import Socials from '../components/authentication/Socials'

const Auth: React.FC = () => {
  const history = useHistory()

  return (
    <Modal>
      <SignInWrapper>
        <StyledCloseButton onClick={() => history.goBack()} />
        <StyledH2>Login</StyledH2>
        <p>login using your socials or your username and password</p>
        <Form />
        <Socials />
      </SignInWrapper>
    </Modal>
  )
}

const SignInWrapper = styled.div`
  height: 100%;
  text-align: center;
  line-height: 1.3;
  display: flex;
  flex-direction: column;
  justify-content: center;

  p {
    padding: 0 0.9em;
  }
`

const StyledH2 = styled.h2`
  font-size: 3rem;
  margin: 0.6em 0;
  font-family: ${(props) => props.theme.fonts.secondary};
`

const StyledCloseButton = styled(AiOutlineClose)`
  position: fixed;
  font-size: 1.2rem;
  top: 0.5em;
  right: 0.5em;
  cursor: pointer;
`

export default Auth
