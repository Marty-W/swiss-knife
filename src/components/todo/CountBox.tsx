import React from 'react'
import styled from 'styled-components/macro'

interface Props {
  numTasks: number
  type: 'scheduled' | 'stashed'
}

const CountBox: React.FC<Props> = ({ numTasks, type }) => {
  return (
    <Wrapper type={type}>
      <Count>{numTasks}</Count>
      <Desc>{type}</Desc>
    </Wrapper>
  )
}

const Wrapper = styled.div<{ type: string }>`
  grid-area: sCount;
  background-color: ${(props) => props.theme.colors.secondary};
  grid-area: ${(props) => (props.type === 'scheduled' ? 'tCount' : 'sCount')};
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 4px;
`

const Count = styled.span`
  font-size: 1.4rem;
  margin-left: 1em;
`

const Desc = styled.p`
  margin-left: 3em;
`

export default CountBox
