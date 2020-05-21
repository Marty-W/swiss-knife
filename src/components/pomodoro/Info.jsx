import React from 'react'
import styled from 'styled-components/macro'

import Card from '../UI/Card'

const Info = () => (
  <InfoWrapper>
    <PomoInfo>
      <p>
        This is the simplest and maybe the most efficient productivity tool in
        my arsenal. Just set a timer for the time period that suits you, start
        the timer, focus on your task, take a break and repeat.
      </p>
    </PomoInfo>
    <PomoInfo>
      <p>
        I am not a big fan of rigid timers with set time so I skipped that
        feature. What suits me the best is to adjust the time based on my
        current attention span. Sometimes its 15, sometimes 50 minutes.
      </p>
    </PomoInfo>
  </InfoWrapper>
)

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const PomoInfo = styled(Card)`
  font-size: 1.8rem;
`

export default Info
