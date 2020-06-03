import React, { useState, useContext } from 'react'
import styled from 'styled-components/macro'
import { AiFillCheckCircle } from 'react-icons/ai'
import Slider from 'rc-slider/lib/Slider'

import 'rc-slider/assets/index.css'

import { db } from '../../utils/firebase'
import { AuthContext } from '../../context/authContext'

import Card from '../UI/Card.styles'

const DailyGoalSetter = ({ handleGoalSet }) => {
  const [dailyGoal, setDailyGoal] = useState(0)

  const { currentUser } = useContext(AuthContext)

  const syncDailyGoal = async () => {
    if (currentUser) {
      try {
        const { uid } = currentUser
        await db.doc(`users/${uid}/pomo/stats`).update({
          dailyGoal,
        })
      } catch (err) {
        console.log(err)
      }
    }
    handleGoalSet(true)
  }

  return (
    <Wrapper>
      <Text>Set your time goal for today: </Text>
      <StyledSlider
        min={0}
        max={720}
        step={10}
        value={dailyGoal}
        onChange={setDailyGoal}
        trackStyle={{
          backgroundColor: '#F02D3A',
        }}
        handleStyle={{
          backgroundColor: '#101119',
          borderColor: '#101119',
        }}
      />
      <Minutes>
        <span>{dailyGoal}</span> minutes
      </Minutes>
      <Check onClick={syncDailyGoal} />
    </Wrapper>
  )
}

const Wrapper = styled(Card)`
  grid-area: goal;
  display: grid;
  grid-template-rows: 1fr 2fr;
  grid-template-columns: auto minmax(1rem, 3rem);
  grid-template-areas:
    'text minutes'
    'slider check';
  place-items: center;
  padding: 0.5em 1.5em;
`

const StyledSlider = styled(Slider)`
  grid-area: slider;
`

const Minutes = styled.p`
  grid-area: minutes;
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;
  span {
    color: ${(props) => props.theme.colors.accent};
    font-weight: bold;
    font-size: 1.5rem;
  }
`

const Check = styled(AiFillCheckCircle)`
  color: ${(props) => props.theme.colors.red};
  font-size: 1.8rem;
  cursor: pointer;
  grid-area: check;
  margin-left: 0.5em;

  &:hover {
    color: ${(props) => props.theme.colors.accent};
  }
`
const Text = styled.p`
  grid-area: text;
  justify-self: start;
  font-size: 1.3rem;
`

export default DailyGoalSetter
