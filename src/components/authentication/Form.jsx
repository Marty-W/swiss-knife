import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey, faUser } from '@fortawesome/free-solid-svg-icons'

import { auth } from '../../utils/firebase'

import Button from '../UI/Button'
import ErrorMsg from '../UI/ErrorMsg'

const Form = () => {
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const history = useHistory()

  const handleSignUp = async (e) => {
    e.preventDefault()
    try {
      await auth.createUserWithEmailAndPassword(userEmail, userPassword)
      history.push('/')
    } catch (err) {
      setErrorMessage(err.message)
    }
  }

  const handleSignIn = async (e) => {
    e.preventDefault()
    try {
      await auth.signInWithEmailAndPassword(userEmail, userPassword)
      history.push('/')
    } catch (err) {
      setErrorMessage(err.message)
    }
  }
  return (
    <StyledForm>
      <label htmlFor="email">
        <StyledIcon icon={faUser} />
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
        <StyledIcon icon={faKey} />
        <input
          type="password"
          onChange={(e) => setUserPassword(e.target.value)}
          value={userPassword}
          id="password"
          placeholder="password"
          required
        />
      </label>
      {errorMessage && <ErrorMsg>{errorMessage}</ErrorMsg>}
      <ButtonWrapper>
        <SignButton onClick={handleSignIn}>Sign In</SignButton>
        <SignUpButton onClick={handleSignUp}>Sign Up</SignUpButton>
      </ButtonWrapper>
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
    background-color: ${(props) => props.theme.colors.red};
    color: ${(props) => props.theme.colors.white};
  }
`
const SignUpButton = styled(SignButton)`
  background-color: ${(props) => props.theme.colors.red};
  color: ${(props) => props.theme.colors.white};

  &:hover {
    color: ${(props) => props.theme.colors.red};
    background-color: ${(props) => props.theme.colors.white};
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
`

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 1.2rem;
  margin: 0 0.4rem;
`

export default Form
