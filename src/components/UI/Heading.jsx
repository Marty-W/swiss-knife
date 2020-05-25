import React from 'react'
import styled from 'styled-components/macro'

const Heading = ({ children }) => <StyledHeading>{children}</StyledHeading>

const StyledHeading = styled.h1`
  font-family: ${(props) => props.theme.fonts.dec};
  font-weight: bold;
  color: ${(props) => props.theme.colors.white};
  letter-spacing: 1.5px;
  font-size: 3rem;
`

export default Heading
