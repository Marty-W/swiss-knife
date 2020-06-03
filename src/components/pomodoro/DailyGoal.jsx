import React, { useState, useContext } from 'react'
import styled from 'styled-components/macro'
import { AiFillCheckCircle } from 'react-icons/ai'
import Slider from 'rc-slider/lib/Slider'
import { db } from '../../utils/firebase'
import { AuthContext } from '../../context/authContext'
import 'rc-slider/assets/index.css'

import Card from '../UI/Card.styles'

const DailyGoal = () => {
  const [dailyGoal, setDailyGoal] = useState(0)
  const [isDailyset, setIsDailySet] = useState(false)

  const { currentUser } = useContext(AuthContext)

  const syncDailyGoal = async () => {
    if (!currentUser) {
      window.localStorage.setItem('dailyGoal', dailyGoal)
    } else {
      const { uid } = currentUser
      await db.collection('users').doc(uid).update({
        'pomo.dailyGoal': dailyGoal,
      })
    }
    setIsDailySet(true)
  }

  return (
    <Wrapper>
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
    </Wrapper>
  )
}

const Wrapper = styled(Card)`
  grid-area: goal;
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

export default DailyGoal
