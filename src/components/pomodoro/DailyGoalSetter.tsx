import React, { useState } from 'react'

import { AiFillCheckCircle } from 'react-icons/ai'
import { Slider } from '@material-ui/core'
import styled from 'styled-components'
import { useToasts } from 'react-toast-notifications'
import { FirebaseError } from 'firebase'
import { db } from '../../firebase/firebase'
import useCurrentUser from '../../hooks/useCurrentUser'

interface Props {
  onGoalSet: React.Dispatch<React.SetStateAction<boolean>>
}

const DailyGoalSetter: React.FC<Props> = ({ onGoalSet }) => {
  const [dailyGoalValue, setDailyGoalValue] = useState(0)
  const user = useCurrentUser()
  const { addToast } = useToasts()

  const syncDailyGoal = async () => {
    try {
      await db.doc(`users/${user?.uid}/pomoGoal/goal`).set(
        {
          dailyGoal: dailyGoalValue,
          timestamp: new Date().getTime(),
        },
        { merge: true },
      )
      onGoalSet(true)
    } catch (err) {
      addToast((err as FirebaseError).message, { appearance: 'error' })
    }
  }

  return (
    <Wrapper>
      <Text>Set your time goal for today</Text>
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

  & .MuiSlider-thumb {
    background-color: ${(props) => props.theme.colors.accent};
  }

  & .MuiSlider-rail {
    background-color: ${(props) => props.theme.colors.tertiary};
  }

  & .MuiSlider-track {
    background-color: ${(props) => props.theme.colors.accent};
  }
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
  align-self: top;
  font-size: 1.1rem;
`

export default DailyGoalSetter
