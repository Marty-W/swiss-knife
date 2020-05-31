import React, { useContext } from 'react'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'
import { auth } from '../../utils/firebase'

import { ReactComponent as Knife } from '../../assets/svgs/swiss-army-knife.svg'
import Button from './Button'

const Header = () => {
  const { currentUser } = useContext(AuthContext)

  const signOutUser = () => {
    auth.signOut()
  }

  return (
    <LogoWrapper>
      <Logo />
      {currentUser ? (
        <SignButton onClick={signOutUser}>Log Out</SignButton>
      ) : (
        <Link to="/auth">
          <SignButton>Sign In</SignButton>
        </Link>
      )}
    </LogoWrapper>
  )
}

const Logo = styled(Knife)`
  fill: ${(props) => props.theme.colors.white};
  width: 2em;
  height: 2em;
  position: absolute;
  top: 1em;
  left: 1em;

  &:hover {
    fill: ${(props) => props.theme.colors.red};
  }
`

const LogoWrapper = styled.div`
  width: 100%;
  margin-bottom: 4em;
`

const SignButton = styled(Button)`
  position: absolute;
  right: 1em;
  top: 1em;
  padding: 0.4em 1em;
  margin: 0;
  border-width: 3px;
  &:hover {
    background: ${(props) => props.theme.colors.white};
  }

  a {
    text-decoration: none;
    background: inherit;
  }
`

export default Header
