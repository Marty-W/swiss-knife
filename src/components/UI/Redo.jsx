import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { useSpring, animated, config } from 'react-spring'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUndoAlt } from '@fortawesome/free-solid-svg-icons'

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

  return (
    <StyledRedo icon={faUndoAlt} onClick={handleOnClick} style={animateProps} />
  )
}

const StyledRedo = styled(animated(FontAwesomeIcon))`
  color: ${(props) => props.theme.colors.white};
`

export default Redo
