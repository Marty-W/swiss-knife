import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components/macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUndoAlt } from '@fortawesome/free-solid-svg-icons'

const Quotes = () => {
  const [quote, setQuote] = useState()

  useEffect(() => {
    fetchNewQuote()
  }, [])

  const fetchNewQuote = async () => {
    const response = await fetch(
      'http://quotes.stormconsultancy.co.uk/random.json'
    )
    const quoteObj = await response.json()
    setQuote(quoteObj.quote)
  }

  return (
    <QuotesWrapper>
      <StyledUndo icon={faUndoAlt} onClick={fetchNewQuote} />
      <StyledQuote>{quote}</StyledQuote>
    </QuotesWrapper>
  )
}

const QuotesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const StyledQuote = styled.span`
  color: ${(props) => props.theme.colors.white};
  padding: 1em 1.2em;
  line-height: 1.2;
`

const rotate = keyframes`
    from {
        transform: rotate(0deg)
    }

    to {
        transform: rotate(359deg)
    }
`

const StyledUndo = styled(FontAwesomeIcon)`
  color: ${(props) => props.theme.colors.white};

  &:hover {
    cursor: pointer;
  }

  &:active {
    animation: ${rotate} 1s linear;
  }
`

export default Quotes
