import React, { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { FaUserShield, FaKey } from 'react-icons/fa'

import { auth } from '../../firebase/firebase'

import Button from '../UI/Button.styles'
import ErrorMsg from '../UI/ErrorMsg.styles'

//FIXME separate sign in and sign up
//TODO add display name to sign up and update via user.updateProfile

type inputRef = HTMLInputElement | null

const Form: React.FC = () => {
  const password = useRef<inputRef>(null)
  const email = useRef<inputRef>(null)
  const [errorMessage, setErrorMessage] = useState('')

  const history = useHistory()

  const handleSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (email.current && password.current) {
      try {
        await auth.createUserWithEmailAndPassword(
          email.current.value,
          password.current.value,
        )
        history.goBack()
      } catch (err) {
        setErrorMessage(err.message)
      }
    }
  }

  const handleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (email.current && password.current) {
      try {
        await auth.signInWithEmailAndPassword(
          email.current.value,
          password.current.value,
        )
        history.goBack()
      } catch (err) {
        setErrorMessage(err.message)
      }
    }
  }
  return (
    <StyledForm>
      <label htmlFor="email">
        <FaUserShield />
        <input
          type="email"
          ref={email}
          id="email"
          placeholder="email"
          required
        />
      </label>
      <label htmlFor="password">
        <FaKey />
        <input
          type="password"
          ref={password}
          id="password"
          placeholder="password"
          required
        />
      </label>
      <ButtonWrapper>
        <SignButton onClick={handleSignIn}>Sign In</SignButton>
        <SignUpButton onClick={handleSignUp}>Sign Up</SignUpButton>
      </ButtonWrapper>
      {errorMessage && <ErrorMsg>{errorMessage}</ErrorMsg>}
    </StyledForm>
  )
}

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 1em 0;
`
const SignButton = styled(Button)`
  width: 40%;
  margin: 0 auto;

  &:hover {
    color: ${(props) => props.theme.colors.accent};
  }
`
const SignUpButton = styled(SignButton)`
  background-color: ${(props) => props.theme.colors.accent};
  color: ${(props) => props.theme.colors.primary};

  &:hover {
    color: ${(props) => props.theme.colors.accent};
    background-color: ${(props) => props.theme.colors.primary};
  }
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;

  & label {
    margin: 0.8em 0;
  }

  & input {
    outline: none;
    border: none;
    width: 80%;
    padding: 0.6em 1em;
    margin: 0 0 0 0.5em;
    border-radius: 10px;
  }

  & svg {
    font-size: 1.2rem;
    margin: 0 0.4rem;
  }
`

export default Form
