import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/'
import { FcGoogle } from 'react-icons/fc'

import { signInWithGoogle } from '../../firebase/firebase'

import ErrorMsg from '../UI/ErrorMsg.styles'

const Socials: React.FC = () => {
  const [errorMsg, setErrorMsg] = useState()
  const history = useHistory()

  const signIn = async () => {
    try {
      signInWithGoogle()
      history.push('/')
    } catch (err) {
      setErrorMsg(err.message)
    }
  }

  return (
    <SocialsWrapper>
      {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
      <StyledGoogle onClick={signIn} />
    </SocialsWrapper>
  )
}

const SocialsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1.5em;
`

const StyledGoogle = styled(FcGoogle)`
  font-size: 2rem;

  &:hover {
    cursor: pointer;
  }
`

export default Socials
