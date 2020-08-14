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
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 2fr 1.8fr 50%;
  grid-template-areas:
    'timer'
    'goal'
    'history';
  grid-row-gap: 2rem;

  @media (min-width: 1000px) {
    grid-template-columns: 0.3fr 1fr 1fr 0.6fr 0.3fr;
    grid-template-rows: repeat(4, 1fr);
    grid-template-areas:
      '. timer svg svg .'
      '. goal svg svg .'
      '. history history history .'
      '. history history history .';
  }
`

export default Pomodoro
