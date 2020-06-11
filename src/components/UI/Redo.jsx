import React, { useState } from 'react'
import styled from 'styled-components/'
import { useSpring, animated, config } from 'react-spring'

import { FaUndoAlt } from 'react-icons/fa'

const Redo = ({ onClick }) => {
  const [clicks, setClicks] = useState(1)
  const [animateProps, set] = useSpring(() => ({
    transform: 'rotate(0deg)',
    config: config.slow,
  }))

  const handleOnClick = () => {
    setClicks((prev) => prev + 1)
    set({ transform: `rotate(${clicks * -360}deg)` })
    onClick()
  }

  return <StyledRedo onClick={handleOnClick} style={animateProps} />
}

const StyledRedo = styled(animated(FaUndoAlt))`
  color: ${(props) => props.theme.colors.white};
`

export default Redo
