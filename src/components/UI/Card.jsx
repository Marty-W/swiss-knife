import React from 'react'
import styled from 'styled-components/macro'

const Card = ({ children }) => <SCard>{children}</SCard>

const SCard = styled.div`
  border: 2px solid ${(props) => props.theme.colors.red};
  color: ${(props) => props.theme.colors.white};
  padding: 0.5em 1em;
  border-radius: 4px;
  margin: 1em;
  text-align: left;
  line-height: 1.5;
`

export default Card
