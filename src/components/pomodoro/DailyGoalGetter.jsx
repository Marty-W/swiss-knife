import React from 'react'
import styled from 'styled-components/'
import { motion } from 'framer-motion'

import Bar from './Bar'

const DailyGoalGetter = ({ dailyGoal, completed, setIsGoalSet }) => (
  <Wrapper>
    <Bar max={dailyGoal} value={completed} />
    <Goal>Daily goal: {dailyGoal}m</Goal>
    <Completed>Completed: {completed}m</Completed>
    <TomatoSpan>Tomatoes:</TomatoSpan>
    <Tomatoes>🍅🍅</Tomatoes>
    <Edit onClick={() => setIsGoalSet(false)}>Edit</Edit>
  </Wrapper>
)

const Wrapper = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 2fr 2fr 1fr;
  grid-template-areas:
    'goal tomato edit'
    'completed tomatoes .'
    'bar bar bar';
`
const Completed = styled.span`
  grid-area: completed;
`

const Goal = styled.span`
  grid-area: goal;
`
const TomatoSpan = styled.span`
  grid-area: tomato;
`

const Tomatoes = styled.div`
  grid-area: tomatoes;
`

const Edit = styled.span`
  grid-area: edit;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  color: ${(props) => props.theme.colors.tertiary};
  font-family: ${(props) => props.theme.fonts.secondary};
  justify-self: end;
`

export default DailyGoalGetter
