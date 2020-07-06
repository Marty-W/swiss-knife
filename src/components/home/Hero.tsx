import React from 'react'
import styled from 'styled-components'

const Hero: React.FC = () => {
  return (
    <>
      <Heading>Swiss Knife</Heading>
    </>
  )
}

const Heading = styled.h1`
  font-size: 3rem;
  font-family: ${(props) => props.theme.fonts.secondary};
`

export default Hero
