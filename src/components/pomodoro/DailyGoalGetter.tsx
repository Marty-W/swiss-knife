/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components/'

import { Progress } from 'antd'

interface Props {
  dailyGoal: number
  completed: number
  handleGoal: React.Dispatch<React.SetStateAction<boolean>>
}

const DailyGoalGetter: React.FC<Props> = ({
  dailyGoal,
  completed,
  handleGoal,
}) => (
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
      {dailyGoal}
    </Goal>
    <Completed>
      Completed:
      {completed}
    </Completed>
    <TomatoSpan>Tomatoes:</TomatoSpan>
    <span>
      <Tomatoes role="img" aria-label="tomatoes">
        🍅🍅
      </Tomatoes>
    </span>
    <Edit onClick={() => handleGoal(false)}>Edit</Edit>
  </Wrapper>
)

const Wrapper = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-areas:
    'goal tomato edit'
    'completed tomatoes .'
    'bar bar bar';
`
const Bar = styled(Progress)`
  grid-area: bar;
  color: ${(props) => props.theme.colors.tertiary};
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
