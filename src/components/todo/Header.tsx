import React from 'react'
import styled from 'styled-components/macro'

interface Props {
  numTasks: number
}

const componentName: React.FC<Props> = ({ numTasks }) => (
  <Wrapper>
    <Greeting>Hello There</Greeting>
    <Overview>You have{numTasks} tasks scheduled for today</Overview>
  </Wrapper>
)

const Wrapper = styled.div`
  grid-area: header;
`

const Greeting = styled.h2`
  font-family: ${(props) => props.theme.fonts.secondary};
  font-size: 2.4rem;
`

const Overview = styled.p`
  grid-column: span 2;
`

export default componentName
