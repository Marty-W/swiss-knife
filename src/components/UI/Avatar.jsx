import React from 'react'
import styled from 'styled-components/macro'

const Avatar = () => <AvatarImg />

const AvatarImg = styled.div`
  width: 2em;
  height: 2em;
  background: ${(props) => props.theme.colors.white};
  border-radius: 50%;
  position: absolute;
  top: 1em;
  right: 1em;
`

export default Avatar
