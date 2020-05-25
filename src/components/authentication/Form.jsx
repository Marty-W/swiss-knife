import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey, faUser } from '@fortawesome/free-solid-svg-icons'

import { auth, db } from '../../utils/firebase'

import Button from '../UI/Button'

const Form = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  const handleSignUp = async (e) => {
    e.preventDefault()
    try {
      const token = await auth.createUserWithEmailAndPassword(email, password)
      const { uid } = token.user
      await db.collection('users').doc(uid).set({
        pomoGoal: 0,
      })
    } catch (err) {
      console.log(err)
    }
    history.push('/')
  }

  const handleSignIn = async (e) => {
    e.preventDefault()
    try {
      await auth.signInWithEmailAndPassword(email, password)
    } catch (err) {
      console.log(err)
    }
    history.push('/')
  }
  return (
    <StyledForm>
      <label htmlFor="email">
        <FontAwesomeIcon icon={faUser} />
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          id="email"
          placeholder="email"
        />
      </label>
      <label htmlFor="password">
        <FontAwesomeIcon icon={faKey} />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          id="password"
          placeholder="password"
        />
      </label>
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
`
const SignButton = styled(Button)`
  width: 40%;
  margin: 0 auto;
`
const SignUpButton = styled(SignButton)`
  background-color: ${(props) => props.theme.colors.red};
  color: ${(props) => props.theme.colors.white};
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;

  & label {
    margin: 1em 0;
  }

  & input {
    outline: none;
    border: none;
    width: 80%;
    padding: 0.4em;
    margin: 0 0 0 0.5em;
  }
`

export default Form
