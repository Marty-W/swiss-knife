import React, { useState } from 'react'
import styled from 'styled-components'
import { AiFillCheckCircle } from 'react-icons/ai'
import Slider from 'react-input-slider'

import { db } from '../../firebase/firebase'
import { useCurrentUser } from '../../context/AuthContext'

interface Props {
  handleGoal: React.Dispatch<React.SetStateAction<boolean>>
}

const DailyGoalSetter: React.FC<Props> = ({ handleGoal }) => {
  const [dailyGoalValue, setDailyGoalValue] = useState(0)

  const user = useCurrentUser()

  const syncDailyGoal = async () => {
    if (user) {
      try {
        await db.doc(`users/${user.uid}/pomo/stats`).update({
          dailyGoal: dailyGoalValue,
          timestamp: Date.now(),
        })
        handleGoal(true)
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <Wrapper>
      <Text>Set your time goal for today: </Text>
      <StyledSlider
        axis="x"
        xmin={0}
        xmax={600}
        xstep={5}
        onChange={({ x }) => setDailyGoalValue(x)}
        x={dailyGoalValue}
        styles={{
          active: {
            backgroundColor: '#F02D3A',
          },
          track: {
            backgroundColor: '#EFF6EE',
          },
          thumb: {
            backgroundColor: '#101119',
          },
        }}
      />
      <Minutes>
        <span>{dailyGoalValue}</span> minutes
      </Minutes>
      <Check onClick={syncDailyGoal} disabled={dailyGoalValue === 0} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: auto 1fr;
  grid-template-areas:
    'text minutes'
    'slider check';
  place-items: center;
  border: none;
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
    font-size: 1.2rem;
  }
`

const Check = styled(AiFillCheckCircle)<{ disabled: boolean }>`
  color: ${(props) => (props.disabled ? 'grey' : props.theme.colors.accent)};
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
  font-size: 1.8rem;
  cursor: pointer;
  grid-area: check;
`
const Text = styled.p`
  grid-area: text;
  justify-self: start;
  font-size: 1rem;
`

export default DailyGoalSetter
