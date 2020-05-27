import React from 'react'
import styled from 'styled-components/macro'

import { AiOutlineClose } from 'react-icons/ai'

const Card = ({ children, show, setShow }) => {
  return (
    <>
      {show && (
        <SCard>
          <StyledCloseButton onClick={() => setShow(false)} />
          {children}
        </SCard>
      )}
    </>
  )
}

const SCard = styled.div`
  border: 2px solid ${(props) => props.theme.colors.red};
  color: ${(props) => props.theme.colors.white};
  padding: 1.2em 0.8em;
  border-radius: 4px;
  margin: 1em;
  text-align: left;
  line-height: 1.5;
  position: relative;
`

const StyledCloseButton = styled(AiOutlineClose)`
  position: absolute;
  font-size: 1rem;
  top: 0.3em;
  right: 0.6em;
  cursor: pointer;
`

export default Card
