import React from 'react'
import styled from 'styled-components/macro'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import { useHistory } from 'react-router-dom'

import FullTimePicker from '../components/pomodoro/FullTimePicker'
import SectionHeading from '../components/UI/SectionHeading.styles'
import DailyGoal from '../components/pomodoro/DailyGoal'
import History from '../components/pomodoro/History'
import { usePomo } from '../context/PomoContext'

const Pomodoro: React.FC = () => {
  const [, dispatch] = usePomo()
  const history = useHistory()

  const handlePomoStart = () => {
    dispatch({ type: 'POMO_START' })
    history.push('/session')
  }

  return (
    <Wrapper>
      <TimerHeading>Pomodoro</TimerHeading>
      <FullTimePicker handlePomoStart={handlePomoStart} />
      <GoalHeading>Time Goal</GoalHeading>
      <DailyGoal />
      <HistoryHeading>History</HistoryHeading>
      <History />
      <InfoToggle />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  grid-area: content;
  display: grid;
  grid-template-columns: minmax(2.5rem, 3rem) 1fr;
  grid-template-rows: 25% 20% 40%;
  grid-template-areas:
    'timerH timer'
    'goalH goal'
    'historyH history';
  grid-row-gap: 2em;
`
const TimerHeading = styled(SectionHeading)`
  grid-area: timerH;
`
const GoalHeading = styled(TimerHeading)`
  grid-area: goalH;
`
const HistoryHeading = styled(TimerHeading)`
  grid-area: historyH;
`

const InfoToggle = styled(AiOutlineQuestionCircle)`
  cursor: pointer;
  position: absolute;
  bottom: 1.2em;
  right: 0.2em;
  color: ${(props) => props.theme.colors.accent};
  font-size: 3rem;

  //FIXME sizing
`

export default Pomodoro
