import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { THistoryQuery } from '../../utils/interfaces'

import CardWithHeader from '../UI/CardWithHeader'

import EntryList from './EntryList'

const History: React.FC = () => {
  const [query, setQuery] = useState<THistoryQuery>('today')
  return (
    <Wrapper header="History" gridArea="history">
      <HistoryWrapper>
        <Options
          onChange={(e) =>
            setQuery((e.target as HTMLInputElement).value as THistoryQuery)
          }
        >
          <input
            type="radio"
            name="options"
            value="today"
            checked={query === 'today'}
            readOnly
          />
          Today
          <input
            type="radio"
            name="options"
            value="yesterday"
            checked={query === 'yesterday'}
            readOnly
          />
          Yesterday
          <input
            type="radio"
            name="options"
            value="all"
            checked={query === 'all'}
            readOnly
          />
          All
        </Options>
        <ColWrapper>
          <span>Started</span>
          <span>Ended</span>
          <span>Duration(m)</span>
          <span>Rating</span>
        </ColWrapper>
        <EntryList query={query} />
      </HistoryWrapper>
    </Wrapper>
  )
}

const Wrapper = styled(CardWithHeader)`
  grid-area: history;
  position: relative;
  overflow-y: auto;
`
const HistoryWrapper = styled.div`
  display: grid;
  height: 100%;
  grid-template-rows: 2rem 1fr 0.1fr;
  grid-template-columns: 1fr;
`

const ColWrapper = styled.div`
  width: 100%;
  grid-column: span 4;
  grid-row: 2;
  display: flex;
  justify-content: space-evenly;
  grid-row: 1 / span 1;
  align-self: flex-end;
  font-weight: bold;
`

const Options = styled.div`
  width: 100%;
  grid-column: span 4;
  grid-row: 1;
  display: flex;
  justify-content: end;
  align-items: center;
  margin-bottom: 1rem;
  grid-row: 3 / -1;
  align-self: flex-end;

  input[type='radio']:checked {
    background-color: ${(props) => props.theme.colors.accent};
  }
`

export default History
