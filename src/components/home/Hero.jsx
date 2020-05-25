import React from 'react'
import styled from 'styled-components/macro'

import { ReactComponent as Stars } from '../../assets/svgs/stars.svg'

const Hero = () => {
  return (
    <>
      <Heading>Swiss Knife</Heading>
      <HeroImg />
    </>
  )
}

const Heading = styled.h1`
  font-size: 3rem;
  font-family: ${(props) => props.theme.fonts.dec};
`

const HeroImg = styled(Stars)`
  position: fixed;
  bottom: 0;
  left: 1em;
  width: 70%;
  height: 70%;
`

export default Hero
