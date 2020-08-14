import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import { FcGoogle } from 'react-icons/fc'

import { FirebaseError } from 'firebase'
import { signInWithGoogle } from '../../firebase/firebase'

import ErrorMsg from '../UI/ErrorMsg.styles'

interface Props {
  hide: () => void
}

const Socials: React.FC<Props> = ({ hide }) => {
  const [error, setError] = useState<FirebaseError>()
  const history = useHistory()

  const signIn = async () => {
    try {
      await signInWithGoogle()
      history.push('/')
      hide()
    } catch (err) {
      setError(err)
    }
  }

  return (
    <SocialsWrapper>
      {error && <ErrorMsg>{error.message}</ErrorMsg>}
      <StyledGoogle onClick={signIn} />
    </SocialsWrapper>
  )
}

const SocialsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`

const StyledGoogle = styled(FcGoogle)`
  font-size: 2rem;

  &:hover {
    cursor: pointer;
  }
`

export default Socials
