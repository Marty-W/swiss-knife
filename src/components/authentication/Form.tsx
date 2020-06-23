import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { FaUserShield, FaKey } from 'react-icons/fa'

import { auth } from '../../utils/firebase'

import Button from '../UI/Button.styles'
import ErrorMsg from '../UI/ErrorMsg.styles'

const Form: React.FC = () => {
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const history = useHistory()

  const handleSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      await auth.createUserWithEmailAndPassword(userEmail, userPassword)
      history.goBack()
    } catch (err) {
      setErrorMessage(err.message)
    }
  }

  const handleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      await auth.signInWithEmailAndPassword(userEmail, userPassword)
      history.goBack()
    } catch (err) {
      setErrorMessage(err.message)
    }
  }
  return (
    <StyledForm>
      <label htmlFor="email">
        <FaUserShield />
        <input
          type="email"
          onChange={(e) => setUserEmail(e.target.value)}
          value={userEmail}
          id="email"
          placeholder="email"
          required
        />
      </label>
      <label htmlFor="password">
        <FaKey />
        <input
          type="password"
          onChange={(e) => setUserPassword(e.target.value)}
          value={userPassword}
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
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.secondary};
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
