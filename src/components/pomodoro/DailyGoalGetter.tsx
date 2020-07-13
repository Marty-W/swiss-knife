/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react'
import styled from 'styled-components/'

import { Progress } from 'antd'

interface Props {
  dailyGoal: number
  completed: number
  onReset: () => void
}

const DailyGoalGetter: React.FC<Props> = ({
  dailyGoal,
  completed,
  onReset,
}) => {
  return (
    <Wrapper>
      <Bar
        percent={Math.floor((completed / dailyGoal) * 100)}
        type="line"
        strokeColor="#F02D3A"
        trailColor="#EFF6EE"
        strokeLinecap="round"
        showInfo={true}
      />
      <Goal>
        Daily goal:
        <NumSpan>{dailyGoal}</NumSpan>
      </Goal>
      <Completed>
        Completed:
        <NumSpan>{completed}</NumSpan>
      </Completed>
      <Edit onClick={onReset}>Edit</Edit>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 2em;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    'goal completed edit'
    'bar bar bar';
  place-items: center;
`
const Bar = styled(Progress)`
  grid-area: bar;
  color: ${(props) => props.theme.colors.tertiary};
  justify-self: stretch;
`

const Completed = styled.div`
  grid-area: completed;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Goal = styled(Completed)`
  grid-area: goal;
`

const NumSpan = styled.span`
  color: ${(props) => props.theme.colors.accent};
  margin-top: 0.3em;
  font-size: 1.3rem;
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
  align-self: start;
`

export default DailyGoalGetter
