import React from 'react'
import styled from 'styled-components/macro'
import { useHistory } from 'react-router-dom'
import DailyGoal from '../components/pomodoro/DailyGoal'
import FullTimePicker from '../components/pomodoro/FullTimePicker'
import History from '../components/pomodoro/History'
import { usePomo } from '../context/PomoContext'
import PomoSvg from '../svgs/PomoSvg'

const Pomodoro: React.FC = () => {
  const [, dispatch] = usePomo()
  const history = useHistory()

  const handlePomoStart = () => {
    dispatch({ type: 'POMO_START' })
    history.push('/session/focus')
  }

  return (
    <Wrapper>
      <FullTimePicker handlePomoStart={handlePomoStart} />
      <PomoSvg />
      <DailyGoal />
      <History />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  grid-area: content;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 2fr 1.8fr 50%;
  grid-template-areas:
    'timer'
    'goal'
    'history';
  grid-row-gap: 2rem;

  @media (min-width: 1000px) {
    margin-bottom: 5rem;
    grid-template-columns: 10rem 1fr 10rem;
    grid-template-areas:
      '. timer .'
      '. goal .'
      '. history .';
  }

  @media (min-width: 1400px) {
    grid-row-gap: 0;
    grid-template-columns: 0.2fr 1fr 0.2fr 0.7fr 0.2fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-areas:
      '. timer . history .'
      '. svg . history .'
      '. goal . history .';
  }
`

export default Pomodoro
