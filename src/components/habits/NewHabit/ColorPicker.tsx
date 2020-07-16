import React, { useState } from 'react'
import styled from 'styled-components'
import { CirclePicker, ColorResult } from 'react-color'

interface Props {
  color: string
  onColorChange: React.Dispatch<React.SetStateAction<string>>
}

const ColorPicker: React.FC<Props> = ({ color, onColorChange }) => {
  const [showPicker, setShowPicker] = useState(false)

  const handleColorPick = (color: ColorResult) => {
    onColorChange(color.hex)
    setShowPicker(false)
  }

  return (
    <Wrapper>
      <span>Label color</span>
      <Swatch color={color} onClick={() => setShowPicker((prev) => !prev)} />
      {showPicker && (
        <Picker color={color} onChangeComplete={handleColorPick} />
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  grid-area: color;
  display: flex;
  align-items: center;

  & span {
    margin-right: 0.6em;
  }
`

const Swatch = styled.div<{ color: string }>`
  width: 2em;
  height: 2em;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  cursor: pointer;
`

const Picker = styled(CirclePicker)`
  position: absolute;
  z-index: 15;
  background: ${(props) => props.theme.colors.primary};
  bottom: 0;
  padding: 1em;
`

export default ColorPicker
