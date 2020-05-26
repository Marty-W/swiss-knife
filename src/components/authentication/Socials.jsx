import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

import { auth, db, Google } from '../../utils/firebase'

const Socials = () => {
  const history = useHistory()

  const signInWithGoogle = async () => {
    try {
      const result = await auth.signInWithRedirect(Google)
      const { uid } = result.user
      console.log(result)
      await db.collection('users').doc(uid).set({
        pomoGoal: 0,
      })
    } catch (err) {
      console.log(err)
    }

    history.push('/')
  }

  return (
    <SocialsWrapper>
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
