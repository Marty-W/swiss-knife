import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

import { auth, Google } from '../../utils/firebase'

import ErrorMsg from '../UI/ErrorMsg'

const Socials = () => {
  const [errorMsg, setErrorMsg] = useState()
  const history = useHistory()

  const signInWithGoogle = async () => {
    try {
      await auth.signInWithPopup(Google)
      history.push('/')
    } catch (err) {
      setErrorMsg(err.message)
    }
  }

  return (
    <SocialsWrapper>
      {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
      <StyledIcon icon={faGoogle} onClick={signInWithGoogle} />
    </SocialsWrapper>
  )
}

const SocialsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 2em;
`

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 2rem;

  &:hover {
    color: ${(props) => props.theme.colors.red};
    cursor: pointer;
  }
`

export default Socials
