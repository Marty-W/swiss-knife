import React from 'react'
import styled from 'styled-components/macro'

const ErrorMsg = ({ children }) => <StyledError>{children}</StyledError>

const StyledError = styled.p`
  color: ${(props) => props.theme.colors.red};
  font-size: 0.7rem;
`

export default ErrorMsg
