import React from 'react'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'

import { ReactComponent as Knife } from '../../assets/svgs/swiss-army-knife.svg'
import Button from './Button'

const Header = () => (
  <LogoWrapper>
    <Logo />
    <Link to="/auth">
      <SignInButton>Sign In</SignInButton>
    </Link>
  </LogoWrapper>
)

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

const SignInButton = styled(Button)`
  position: fixed;
  right: 1em;
  top: 1em;
  padding: 0.2em 1em;
  margin: 0;
  &:hover {
    background: ${(props) => props.theme.colors.white};
  }

  a {
    text-decoration: none;
    background: inherit;
  }
`

export default Header
