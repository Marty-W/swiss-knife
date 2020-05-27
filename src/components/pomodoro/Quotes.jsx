import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'

import Redo from '../UI/Redo'

// TODO better error handling, maybe simulate internet fall

const Quotes = () => {
  const [quote, setQuote] = useState()
  const [error, setError] = useState()

  useEffect(() => {
    fetchNewQuote()
  }, [])

  const fetchNewQuote = async () => {
    try {
      const response = await fetch(
        'http://quotes.stormconsultancy.co.uk/random.json'
      )
      const quoteObj = await response.json()
      setQuote(quoteObj.quote)
    } catch (err) {
      setError(err)
    }
  }

  return (
    <QuotesWrapper>
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          <Redo onClick={fetchNewQuote} />
          <StyledQuote>{quote}</StyledQuote>
        </>
      )}
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
