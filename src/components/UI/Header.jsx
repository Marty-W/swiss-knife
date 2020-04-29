import React from 'react'
import styled from 'styled-components/macro'

import { ReactComponent as Knife } from '../../assets/svgs/swiss-army-knife.svg'
import Avatar from './Avatar'

const Header = () => (
  <LogoWrapper>
    <Logo />
    <Avatar />
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

export default Header
