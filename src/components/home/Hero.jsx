import React from 'react'
import styled from 'styled-components/macro'
import { useSpring, animated } from 'react-spring'

import { ReactComponent as Stars } from '../../assets/svgs/stars.svg'

const Hero = () => {
  const textSpring = useSpring({
    from: {
      marginRight: -1000,
    },
    to: {
      marginRight: 1000,
    },
  })

  return (
    <>
      <Heading>Swiss Knife</Heading>
      <animated.p style={textSpring}>Shit</animated.p>
      <HeroImg />
    </>
  )
}

const Heading = styled.h1`
  font-size: 3rem;
  font-family: ${(props) => props.theme.fonts.heading};
`

const HeroImg = styled(Stars)`
  position: fixed;
  bottom: 0;
  left: 1em;
  width: 70%;
  height: 70%;
`

export default Hero
