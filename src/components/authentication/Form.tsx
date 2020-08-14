import { FaKey, FaUserShield } from 'react-icons/fa'
import React, { useRef, useState } from 'react'
import BeatLoader from 'react-spinners/BeatLoader'
import styled from 'styled-components/macro'
import { useToasts } from 'react-toast-notifications'
import { FirebaseError } from 'firebase'
import { auth, firebase } from '../../firebase/firebase'
import Button from '../UI/Button'
import useCurrentUser from '../../hooks/useCurrentUser'
import { TinputRef } from '../../utils/interfaces'

interface Props {
  hide: () => void
}

const Form: React.FC<Props> = ({ hide }) => {
  const [loading, setLoading] = useState(false)
  const password = useRef<TinputRef>(null)
  const email = useRef<TinputRef>(null)
  const user = useCurrentUser()
  const { addToast } = useToasts()

  const handleSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (email.current && password.current) {
      setLoading(true)
      if (!user?.isAnonymous) {
        try {
          await auth.createUserWithEmailAndPassword(
            email.current?.value,
            password.current?.value,
          )
          setLoading(false)
          hide()
        } catch (err) {
          setLoading(false)
          addToast((err as FirebaseError).message, { appearance: 'error' })
        }
      } else {
        const credential = firebase.auth.EmailAuthProvider.credential(
          email.current.value,
          password.current.value,
        )
        try {
          await user.linkWithCredential(credential)
          setLoading(false)
          hide()
        } catch (err) {
          setLoading(false)
          addToast((err as FirebaseError).message, { appearance: 'error' })
        }
      }
    }
  }

  const handleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (email.current && password.current) {
      setLoading(true)
      try {
        await auth.signInWithEmailAndPassword(
          email.current.value,
          password.current.value,
        )
        setLoading(false)
        hide()
      } catch (err) {
        setLoading(false)
        addToast((err as FirebaseError).message, { appearance: 'error' })
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
        <Button onClick={handleSignIn} variant="secondary">
          Sign In
        </Button>
        <Button onClick={handleSignUp} variant="primary">
          Sign Up
        </Button>
      </ButtonWrapper>
      {loading && <BeatLoader color="#fff" />}
    </StyledForm>
  )
}

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
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
