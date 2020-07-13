import React, { useState } from 'react'
import styled from 'styled-components'
import { AiFillCheckCircle } from 'react-icons/ai'
import { Slider } from '@material-ui/core'
import { db } from '../../firebase/firebase'
import useCurrentUser from '~/hooks/useCurrentUser'

const DailyGoalSetter: React.FC = () => {
  const [dailyGoalValue, setDailyGoalValue] = useState(0)

  const user = useCurrentUser()

  const syncDailyGoal = async () => {
    if (user) {
      try {
        await db.doc(`users/${user.uid}/pomoStats/stats`).update({
          dailyGoal: dailyGoalValue,
          timestamp: Date.now(),
        })
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <Wrapper>
      <Text>Set your time goal for today: </Text>
      <StyledSlider
        max={720}
        step={5}
        value={dailyGoalValue}
        onChange={(e, num) => setDailyGoalValue(num as number)}
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
  grid-template-columns: 3fr 1fr;
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
