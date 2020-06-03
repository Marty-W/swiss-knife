import React from 'react'
import styled from 'styled-components/macro'

import { AiOutlineClose } from 'react-icons/ai'
import Card from './Card.styles'

const InfoCard = ({ children, show, setShow }) => {
  return (
    <>
      {show && (
        <Card>
          <StyledCloseButton onClick={() => setShow(false)} />
          {children}
        </Card>
      )}
    </>
  )
}

const StyledCloseButton = styled(AiOutlineClose)`
  position: absolute;
  font-size: 1rem;
  top: 0.3em;
  right: 0.6em;
  cursor: pointer;
`

export default InfoCard
