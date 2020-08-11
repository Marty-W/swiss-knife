import { GrFormCheckmark, GrFormClose } from 'react-icons/gr'

import React from 'react'
import styled from 'styled-components/'

interface Props {
  checked?: boolean
  color: string
  onCheck: (date: Date, checked: boolean) => void
  day: Date
}

const HabitCheck: React.FC<Props> = ({
  checked = false,
  color,
  onCheck,
  day,
}) => (
  <Wrapper onClick={() => onCheck(day, checked)}>
    {checked ? <Check color={color} /> : <XMark color={color} />}
  </Wrapper>
)

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  & svg {
    cursor: pointer;
    place-self: center;
  }
`

const XMark = styled(GrFormClose)`
  & path {
    stroke: ${(props) => props.theme.colors.secondary};
  }
`

const Check = styled(GrFormCheckmark)<{ color: string }>`
  & polyline {
    stroke: ${(props) => props.color};
  }
`

export default HabitCheck
