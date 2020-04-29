import React from 'react'
import styled from 'styled-components/macro'

import Card from '../../UI/Card'

const Info = () => (
  <InfoWrapper>
    <Card>
      <p>
        Most Pomo apps let you define short breaks, long breaks and I don't find
        that really helpful.
      </p>
    </Card>
    <Card>Rigid systems dont work very well with my flow</Card>
  </InfoWrapper>
)

const InfoWrapper = styled.div`
  display: flex;

  & p {
    font-size: 0.8em;
  }
`

export default Info
