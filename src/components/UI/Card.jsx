import React from 'react'
import styled from 'styled-components/macro'

const Card = ({ children }) => <SCard>{children}</SCard>

const SCard = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.dark};
  padding: 0.5em 1em;
  border-radius: 4px;
  margin: 1em;
`

export default Card
