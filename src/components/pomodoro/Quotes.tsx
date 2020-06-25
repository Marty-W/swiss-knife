import React, { useState, useEffect } from 'react'
import styled from 'styled-components/'

import Redo from '../UI/Redo'
import ErrorMsg from '../UI/ErrorMsg.styles'

const Quotes: React.FC = () => {
  const [quote, setQuote] = useState('')
  const [errorMsg, setErrorMsg] = useState()

  useEffect(() => {
    fetchNewQuote().catch((err) => console.log(err))
  }, [])

  const fetchNewQuote = async () => {
    try {
      const response = await fetch(
        'https://programming-quotes-api.herokuapp.com/quotes/random',
      )
      const body = await response.json()
      setQuote(body.en)
    } catch (err) {
      setErrorMsg(err)
    }
  }

  return (
    <QuotesWrapper>
      {errorMsg ? (
        <ErrorMsg>{errorMsg}</ErrorMsg>
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
  color: ${(props) => props.theme.colors.tertiary};
  padding: 1em 1.2em;
  line-height: 1.2;
`

export default Quotes
