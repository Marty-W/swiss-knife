/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react'
import styled from 'styled-components/'
import ProgressBar from '../UI/ProgressBar'

interface Props {
  dailyGoal: number
  completed: number
  onGoalSet: React.Dispatch<React.SetStateAction<boolean>>
}

const DailyGoalGetter: React.FC<Props> = ({
  dailyGoal,
  completed,
  onGoalSet,
}) => (
    <Wrapper>
      <ProgressBar percentage={Math.floor((completed / dailyGoal) * 100)} />
      <Goal>
        <Desc>Daily goal:</Desc>
        <NumSpan>{dailyGoal}</NumSpan>
      </Goal>
      <Completed>
        <Desc>Completed:</Desc>
        <NumSpan>{completed}</NumSpan>
      </Completed>
      <Edit onClick={() => onGoalSet(false)}>Edit</Edit>
    </Wrapper>
  )

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

const Completed = styled.div`
  grid-area: completed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Goal = styled(Completed)`
  grid-area: goal;
`

const Desc = styled.span`
  font-weight: bold;
  margin-right: 1rem;
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
  color: ${(props) => props.theme.colors.accent};
  justify-self: end;
  align-self: start;
  cursor: pointer;
`

export default DailyGoalGetter
