/* eslint-disable consistent-return */
import React from 'react'
import styled from 'styled-components/'

import Card from '../UI/Card.styles'
import DailyGoalGetter from './DailyGoalGetter'
import DailyGoalSetter from './DailyGoalSetter'

import useDailyGoalData from '~/hooks/useDailyGoalData'
import Spinner from '../UI/Spinner'

const DailyGoal: React.FC = () => {
  const [{ dailyGoal, completed }, loading, resetGoal] = useDailyGoalData()

  return (
    <Wrapper>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {dailyGoal > 0 ? (
            <DailyGoalGetter
              dailyGoal={dailyGoal}
              completed={completed}
              onReset={resetGoal}
            />
          ) : (
            <DailyGoalSetter />
          )}
        </>
      )}
    </Wrapper>
  )
}

const Wrapper = styled(Card)`
  grid-area: goal;
  & svg {
    margin: auto;
  }
`

export default DailyGoal
