import React from 'react'
import styled from 'styled-components/macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import { useHistory } from 'react-router-dom'

import Modal from '../components/UI/Modal'
import Form from '../components/authentication/Form'
import Socials from '../components/authentication/Socials'

const Auth = () => {
  const history = useHistory()

  return (
    <Modal type="center">
      <SignInWrapper>
        <StyledCloseButton icon={faTimes} onClick={history.goBack} />
        <StyledH2>Login</StyledH2>
        <p>login using your socials or your username and password</p>
        <Form />
        <Socials />
      </SignInWrapper>
    </Modal>
  )
}

const SignInWrapper = styled.div`
  text-align: center;
`

const StyledH2 = styled.h2`
  font-size: 3rem;
  margin: 1em 0.2em 0 0;
  font-family: ${(props) => props.theme.fonts.dec};
`

const StyledCloseButton = styled(FontAwesomeIcon)`
  position: fixed;
  font-size: 1.2rem;
  top: 0.5em;
  right: 0.5em;
  cursor: pointer;
`

export default Auth
