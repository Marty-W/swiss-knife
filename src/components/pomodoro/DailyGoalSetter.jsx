import React, { useState, useContext } from 'react'
import styled from 'styled-components/macro'
import { AiFillCheckCircle } from 'react-icons/ai'
import Slider from 'rc-slider/lib/Slider'

import 'rc-slider/assets/index.css'

import { db } from '../../utils/firebase'
import { AuthContext } from '../../context/authContext'

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
    <DailyGoalWrapper>
      <StyledText>Set your time goal for today: </StyledText>
      <StyledSlider
        min={0}
        max={720}
        step={10}
        value={dailyGoal}
        onChange={setDailyGoal}
        trackStyle={{
          backgroundColor: '#CC2936',
        }}
        handleStyle={{
          backgroundColor: '#303036',
          borderColor: '#303036',
        }}
      />
      <Minutes>
        <span>{dailyGoal}</span> minutes
      </Minutes>
      <Check onClick={syncDailyGoal} />
    </DailyGoalWrapper>
  )
}

const DailyGoalWrapper = styled.div`
  padding: 0.7em 1em;
  margin: 2em 0;
  background-color: ${(props) => props.theme.colors.purple};
  border-radius: 5px;
  display: grid;
  grid-template-rows: 1fr 2fr;
  grid-template-columns: 4fr 1fr;
  grid-template-areas:
    'text minutes'
    'slider check';
  place-items: center;
`

const StyledSlider = styled(Slider)`
  grid-area: slider;
`

const Minutes = styled.p`
  grid-area: minutes;
  align-self: start;
  user-select: none;
  span {
    color: ${(props) => props.theme.colors.red};
    display: block;
    font-weight: bold;
    font-size: 1.5rem;
  }
`

const Check = styled(AiFillCheckCircle)`
  color: ${(props) => props.theme.colors.red};
  font-size: 1.8rem;
  cursor: pointer;
  grid-area: check;
`
const StyledText = styled.p`
  grid-area: text;
  justify-self: start;
`

export default DailyGoalSetter
