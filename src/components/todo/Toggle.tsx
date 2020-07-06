import React from 'react'
import styled from 'styled-components/macro'
import { Switch } from '@material-ui/core'

interface Props {
  show: boolean
  handleShow: React.Dispatch<React.SetStateAction<boolean>>
}

const Toggle: React.FC<Props> = ({ show, handleShow }) => (
  <Wrapper>
    <span>Show completed</span>
    <Switch
      size="small"
      checked={show}
      value={show}
      onChange={() => handleShow((prev) => !prev)}
    />
  </Wrapper>
)

export default Toggle

const Wrapper = styled.div`
  grid-area: doneSwitch;
  justify-self: end;
  display: flex;
  align-items: center;
`
