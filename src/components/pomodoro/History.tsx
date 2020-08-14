import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { THistoryQuery } from '../../utils/interfaces'

import CardWithHeader from '../UI/CardWithHeader'

import EntryList from './EntryList'

const History: React.FC = () => {
  const [query, setQuery] = useState<THistoryQuery>('today')
  return (
    <Wrapper header="History" gridArea="history">
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
    </Wrapper>
  )
}

const Wrapper = styled(CardWithHeader)`
  grid-area: history;
  position: relative;
  overflow-y: scroll;
`

const ColWrapper = styled.div`
  width: 100%;
  grid-column: span 4;
  grid-row: 2;
  display: flex;
  justify-content: space-evenly;
`

const Options = styled.div`
  width: 100%;
  grid-column: span 4;
  grid-row: 1;
  display: flex;
  justify-content: end;
  align-items: center;
  margin-bottom: 1rem;
`

export default History
