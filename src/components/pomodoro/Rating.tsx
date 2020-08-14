import React from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components/macro'
import { usePomo } from '../../context/PomoContext'

const Rating: React.FC = () => {
  const [state] = usePomo()
  const duration = state.duration.as('minutes')

  let output = ''

  if (duration < 25 && duration !== 0) {
    output = '🍅'
  } else if (duration < 50 && duration !== 0) {
    output = '🍅🍅'
  } else if (duration >= 50) {
    output = '🍅🍅🍅'
  }

  return (
    <>
      {duration > 0 && (
        <Wrapper variants={variants} initial="out" animate="in">
          <span>Rating:</span>
          <span>{output}</span>
        </Wrapper>
      )}
    </>
  )
}

const Wrapper = styled(motion.div)`
  grid-area: rating;
  width: 100%;

  & span:first-child {
    display: block;
  }
`

const variants = {
  out: { opacity: 0 },
  in: { opacity: 1 },
}

export default Rating
