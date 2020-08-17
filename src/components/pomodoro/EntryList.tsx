import React, { useEffect } from 'react'
import styled from 'styled-components/macro'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useErrorHandler } from 'react-error-boundary'
import { IPomoEntry, THistoryQuery } from '../../utils/interfaces'
import useUserDocumentRef from '../../hooks/useUserDocumentRef'
import Entry from './Entry'
import Spinner from '../UI/Spinner'
import InfoText from '../UI/InfoText'

interface Props {
  query: THistoryQuery
}

const EntryList: React.FC<Props> = ({ query }) => {
  const entriesRef = useUserDocumentRef(
    'pomoEntries',
    query,
  ) as firebase.firestore.Query
  const [entries, loading, error] = useCollectionData<IPomoEntry>(entriesRef)
  const handleError = useErrorHandler()

  useEffect(() => {
    error && handleError(error)
  }, [error, handleError])
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <EntriesWrapper>
          {entries?.length ? (
            entries.map(({ duration, endTime, startTime, id }) => (
              <Entry key={id} start={startTime} end={endTime} dur={duration} />
            ))
          ) : (
            <InfoText>Finish your first session to see your entry.</InfoText>
          )}
        </EntriesWrapper>
      )}
    </>
  )
}
export default EntryList

const EntriesWrapper = styled.div`
  display: grid;
  overflow: hidden;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 3rem;
  grid-auto-rows: 3rem;
  place-items: center;
  & div:nth-child(even) {
    background-color: ${(props) => props.theme.colors.primary};
  }
`
