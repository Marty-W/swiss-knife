import { FiMoon, FiSun } from 'react-icons/fi'
import React, { useState } from 'react'

import { Switch } from '@material-ui/core'
import styled from 'styled-components/'

interface Props {
  themeToggle: () => void
}

const DarkModeToggle: React.FC<Props> = ({ themeToggle }) => {
  const [isChecked, setIsChecked] = useState(false)

  const handleCheck = () => {
    setIsChecked(!isChecked)
    themeToggle()
  }

  return (
    <Wrapper isChecked={isChecked}>
      <FiMoon />
      <Switch
        size="small"
        checked={isChecked}
        value={isChecked}
        onChange={handleCheck}
      />
      <FiSun />
    </Wrapper>
  )
}

export default DarkModeToggle

const Wrapper = styled.div<{ isChecked: boolean }>`
  display: flex;
  align-items: center;
  border-radius: 10%;

  & .MuiSwitch-track {
    fill: ${(props) => props.theme.colors.accent};
  }
`
