import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGoogle,
  faGithub,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'

import { auth, db, Google } from '../../utils/firebase'

// TODO dodelat socials, zatim funguje jen google
// TODO google sign in nevytvari document

const Socials = () => {
  const history = useHistory()

  const signInWithGoogle = async () => {
    try {
      const token = await auth.signInWithRedirect(Google)
      const { uid } = token.user
      console.log(token)
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
      <StyledIcon icon={faGithub} />
      <StyledIcon icon={faTwitter} />
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
