import React from 'react'
import styled from 'styled-components/macro'

const SectionHeading = ({ children }) => <StyledH2>{children}</StyledH2>

const StyledH2 = styled.h2`
  font-weight: bold;
  color: ${(props) => props.theme.colors.dark};
  font-size: 1.4rem;
  margin-bottom: 0.6em;
`

export default SectionHeading
