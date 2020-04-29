import React, { useEffect, useState } from 'react'
import { Duration } from 'luxon'
import { animated, useSpring } from 'react-spring'

import styled from 'styled-components/macro'
import { useInterval } from '../../hooks/useInterval'
import Modal from '../UI/Modal'
import Button from '../UI/Button'

const FocusMode = ({ dispatch, duration }) => {
  const [localPomoLength, setLocalPomoLength] = useState(() =>
    Duration.fromMillis(0)
  )
  const [isPaused, setIsPaused] = useState(false)
  const springProps = useSpring({
    from: { height: '0%' },
    to: { height: '100%' },
    config: {
      duration: duration.as('milliseconds'),
    },
  })

  useEffect(() => {
    setLocalPomoLength(duration)
  }, [duration])

  useInterval(() => {
    setLocalPomoLength((prev) => {
      if (prev.as('milliseconds') > 0 && !isPaused) {
        return prev.minus(1000)
      }
      return prev
    })
  }, 1000)

  const handlePause = () => setIsPaused((prev) => !prev)

  return (
    <>
      <Modal>
        <AnimatedTimeLeft style={springProps} />
        <FocusWrapper>
          <TimeLeft>{localPomoLength.toFormat('mm:ss')}</TimeLeft>
          <Buttons>
            <Button onClick={handlePause}>
              {isPaused ? 'Continue' : 'Pause'}
            </Button>
            <Button onClick={() => dispatch({ type: 'POMO_STOP' })}>
              Reset
            </Button>
          </Buttons>
        </FocusWrapper>
      </Modal>
    </>
  )
}

const FocusWrapper = styled.div`
  background: ${(props) => props.theme.colors.white};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 5;
`

const TimeLeftAnimDiv = styled.div`
  width: 100%;
  background: ${(props) => props.theme.colors.red};
  position: absolute;
  bottom: 0;
  height: ${(props) => props.height};
  z-index: 10;
`
const AnimatedTimeLeft = animated(TimeLeftAnimDiv)

const TimeLeft = styled.span`
  color: ${(props) => props.theme.colors.dark};
  mix-blend-mode: difference;
  font-size: 1.8rem;
  margin: 1em;
`

const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`

export default FocusMode
