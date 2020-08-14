import React from 'react'
import styled from 'styled-components/macro'
import Card from './Card.styles'
import SectionHeading from './SectionHeading.styles'

interface Props {
  header: string
  gridArea: string
}

const CardWithHeader: React.FC<Props> = ({ children, header, gridArea }) => (
  <Wrapper gridArea={gridArea}>
    <SCard>{children}</SCard>
    <SHeading>{header}</SHeading>
  </Wrapper>
)

export default CardWithHeader

const Wrapper = styled.div<{ gridArea: string }>`
  position: relative;
  grid-area: ${(props) => props.gridArea};
  display: grid;
  grid-template-columns: minmax(1.3rem, 2.2rem) 1fr;
  grid-template-rows: 1fr;

  @media (min-width: 1000px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr minmax(1.3rem, 2.2rem);
    grid-row-gap: 0.5rem;
  }
`

const SCard = styled(Card)`
  grid-column: 2 / span 1;

  @media (min-width: 1000px) {
    grid-column: 1 / -1;
    grid-row: 1 / span 1;
  }
`

const SHeading = styled(SectionHeading)`
  grid-column: 1 / span 1;
  grid-row: 1;

  @media (min-width: 1000px) {
    grid-column: 1;
    grid-row: 2 / span 1;
  }
`
