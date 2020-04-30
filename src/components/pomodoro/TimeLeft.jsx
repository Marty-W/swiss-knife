import React from 'react'
import styled from 'styled-components/macro'

const TimeLeft = ({ duration }) => (
  <StyledTimeLeft>{duration.toFormat('mm:ss')}</StyledTimeLeft>
)

export default TimeLeft

const StyledTimeLeft = styled.span`
  color: ${(props) => props.theme.colors.dark};
  font-size: 1.8rem;
  margin: 1em;
  z-index: 10;
`
