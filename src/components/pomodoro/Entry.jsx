import React from 'react'
import styled from 'styled-components/macro'

import { IoIosTimer } from 'react-icons/io'

const Entry = ({ start, end, dur }) => (
  <StyledEntry>
    <IoIosTimer />
    <span>{start}</span>
    <span> {end}</span>
    <span> {dur} minutes</span>
  </StyledEntry>
)

const StyledEntry = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: minmax(10px, 50px) repeat(3, 1fr);
  place-items: center;

  svg {
    color: ${(props) => props.theme.colors.red};
  }
`
export default Entry
