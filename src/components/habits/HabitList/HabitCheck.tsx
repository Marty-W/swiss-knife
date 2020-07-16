import React from 'react'
import styled from 'styled-components/macro'
import { GrFormCheckmark, GrFormClose } from 'react-icons/gr'

interface Props {
  checked?: boolean
}

const HabitCheck: React.FC<Props> = ({ checked = false }) => {
  return <Wrapper>{checked ? <GrFormCheckmark /> : <GrFormClose />}</Wrapper>
}

const Wrapper = styled.div`
  & svg path {
    stroke: ${(props) => props.theme.colors.tertiary};
  }
`

export default HabitCheck
