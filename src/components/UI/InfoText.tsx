import styled from 'styled-components/macro'
import React from 'react'

const InfoText: React.FC = ({ children }) => (
  <Wrapper>
    <Text>{children}</Text>
  </Wrapper>
)

export default InfoText

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  grid-column: 1 / -1;
`

const Text = styled.p`
  font-style: italic;
`
