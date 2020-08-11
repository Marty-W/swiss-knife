import React from 'react'
import styled from 'styled-components'
import Form from '../components/authentication/Form'
import Socials from '../components/authentication/Socials'

interface Props {
  hide: () => void
}

const Auth: React.FC<Props> = ({ hide }) => (
  <SignInWrapper>
    <StyledH2>Welcome</StyledH2>
    <p>login using Google or your username and password</p>
    <Form hide={hide} />
    <Socials hide={hide} />
  </SignInWrapper>
)

const SignInWrapper = styled.div`
  height: 100%;
  width: 100%;
  text-align: center;
  line-height: 1.3;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`

const StyledH2 = styled.h2`
  font-size: 3rem;
  font-family: ${(props) => props.theme.fonts.secondary};
`

export default Auth
