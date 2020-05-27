import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import { GoLightBulb } from 'react-icons/go'

import useStickyState from '../../hooks/useStickyState'

import Card from '../UI/Card'

const Info = () => {
  const [showCard1, setShowCard1] = useStickyState(true, 'card1')
  const [showCard2, setShowCard2] = useStickyState(true, 'card2')
  const [showBulb, setShowBulb] = useState(false)

  useEffect(() => {
    if (!showCard1 || !showCard2) {
      setShowBulb(true)
    }
    if (showCard1 && showCard2) {
      setShowBulb(false)
    }
  }, [showCard1, showCard2])

  const handleShowAll = () => {
    setShowCard1(true)
    setShowCard2(true)
  }

  return (
    <InfoWrapper>
      {showBulb && <LightBulb onClick={handleShowAll} />}
      <PomoInfo show={showCard1} setShow={setShowCard1}>
        <p>
          This is the simplest and maybe the most efficient productivity tool in
          my arsenal. Just set a timer for the time period that suits you, start
          the timer, focus on your task, take a break and repeat.
        </p>
      </PomoInfo>
      <PomoInfo show={showCard2} setShow={setShowCard2}>
        <p>
          I am not a big fan of rigid timers with set time so I skipped that
          feature. What suits me the best is to adjust the time based on my
          current attention span. Sometimes its 15, sometimes 50 minutes.
        </p>
      </PomoInfo>
    </InfoWrapper>
  )
}

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const PomoInfo = styled(Card)`
  font-size: 1.8rem;
`

const LightBulb = styled(GoLightBulb)`
  &:hover {
    color: yellow;
  }
  cursor: pointer;
  position: fixed;
  bottom: 4em;
  right: 1em;
`

export default Info
