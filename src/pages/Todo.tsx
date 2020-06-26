import React from 'react'
import styled from 'styled-components'

import Header from '../components/todo/Header'

const Todo: React.FC = () => {
  return (
    <Wrapper>
      <Header numTasks={4} />
    </Wrapper>
  )
}

export default Todo

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 2fr 2fr 1fr 0.3fr 6fr;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    'header header'
    'tCount sCount'
    'tSwitch sSwitch'
    'date .'
    'tasks tasks';
`
