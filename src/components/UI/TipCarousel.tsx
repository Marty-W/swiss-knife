import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'

const initTips: StringArray = {
  pomodoro: [
    'Try different intervals and feel free to change them frequently.',
    'Have a break after the session, you deserve it!',
  ],
  todo: [
    'Write down your tasks every morning.',
    `Don't overestimate your power. Focus on 3 - 5 major tasks in a given
            day.`,
  ],
  habits: [
    'Adding new habits to your life is hard. Stick to 1-3 new ones at a time.',
    `Don't focus on the streak too much. It can be discouraging to break
            a good one and its hard to come back.`,
  ],
}

interface Props {
  loc: string
}

interface StringArray {
  [propName: string]: string[]
}

const TipCarousel: React.FC<Props> = ({ loc }) => {
  const [tips] = useState<string[]>(initTips[loc])
  const [activeTipIndex, setActiveTipIndex] = useState(0)

  const handleTipSwitch = (type: 'plus' | 'minus'): void => {
    if (type === 'plus') {
      activeTipIndex >= tips.length - 1
        ? setActiveTipIndex(0)
        : setActiveTipIndex(activeTipIndex + 1)
    }

    activeTipIndex === 0
      ? setActiveTipIndex(tips.length - 1)
      : setActiveTipIndex(activeTipIndex - 1)
  }

  return (
    <Wrapper>
      <Minus onClick={() => handleTipSwitch('minus')} />
      <Text>{tips[activeTipIndex]}</Text>
      <Plus onClick={() => handleTipSwitch('plus')} />
    </Wrapper>
  )
}
export default TipCarousel

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`

const Minus = styled(BsChevronLeft)`
  position: absolute;
  left: 0;
  cursor: pointer;
`

const Plus = styled(BsChevronRight)`
  cursor: pointer;
  position: absolute;
  right: 0;
`

const Text = styled.p`
  max-width: 80%;
`
