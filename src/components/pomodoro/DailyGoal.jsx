import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

import Slider from 'rc-slider/lib/Slider'
import 'rc-slider/assets/index.css'

const DailyGoal = () => {
  const [dailyGoal, setDailyGoal] = useState(0)

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
      <Check icon={faCheckCircle} />
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
  span {
    color: ${(props) => props.theme.colors.red};
    display: block;
    font-weight: bold;
    font-size: 1.5rem;
  }
`

const Check = styled(FontAwesomeIcon)`
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
