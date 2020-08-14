import React from 'react'

import styled from 'styled-components/macro'
import MasterPlanSVG from './MasterPlanSVG'

const Hero: React.FC = () => (
  <Wrapper>
    <Heading>Swiss Knife</Heading>
    <BackSVG />
  </Wrapper>
)

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`

const BackSVG = styled(MasterPlanSVG)`
  position: absolute;
  left: 0;
  bottom: 0;
`

const Heading = styled.h1`
  font-size: 3rem;
  font-family: ${(props) => props.theme.fonts.secondary};
`

export default Hero
