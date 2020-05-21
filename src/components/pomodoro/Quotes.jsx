import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'

import Redo from '../UI/Redo'

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
      <Redo onClick={fetchNewQuote} />
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

export default Quotes
