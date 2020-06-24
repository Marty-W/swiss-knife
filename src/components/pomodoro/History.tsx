/* eslint-disable consistent-return */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/';
import { DateTime } from 'luxon';
import { v4 as uuidv4 } from 'uuid';

import { db } from '../../utils/firebase';
import Card from '../UI/Card.styles';
import Entry from './Entry';
import { useCurrentUser } from '../../context/AuthContext';

interface EntryInt {
  startTime: string;
  endTime: string;
  duration: number;
}

interface ServerEntry {
  startTime: string;
  endTime: string;
  durationInMinutes: number;
}

const History: React.FC = () => {
  const [entries, setEntries] = useState<EntryInt[] | undefined>();
  const currentUser = useCurrentUser();

  useEffect(() => {
    if (currentUser) {
      const { uid } = currentUser;
      return db.doc(`users/${uid}/pomo/timeEntries`).onSnapshot((snapshot) => {
        const entriesData: ServerEntry[] = snapshot?.data()?.timeEntries;
        entriesData.map((entry: ServerEntry) => {
          const formatted = formatEntry(entry);
          return setEntries((prev) => [...(prev ?? []), formatted]);
        });
      });
    }
    setEntries([]);
  }, [currentUser]);

  const formatEntry = (entry: ServerEntry) => {
    const formattedStartTime = DateTime.fromMillis(
      +entry.startTime,
    ).toLocaleString(DateTime.TIME_24_SIMPLE);
    const formattedEndTime = DateTime.fromMillis(+entry.endTime).toLocaleString(
      DateTime.TIME_24_SIMPLE,
    );

    return {
      startTime: formattedStartTime,
      endTime: formattedEndTime,
      duration: entry.durationInMinutes,
    };
  };

  return (
    <Wrapper>
      <span>Started</span>
      <span>Ended</span>
      <span>Duration(m)</span>
      <span>Rating</span>
      {!currentUser && <p>Log in to view your past sessions.</p>}
      {entries &&
        entries.map((entry) => {
          const { startTime, endTime, duration } = entry;
          return (
            <Entry
              key={uuidv4()}
              start={startTime}
              end={endTime}
              dur={duration}
            />
          );
        })}
    </Wrapper>
  );
};

const Wrapper = styled(Card)`
  position: relative;
  grid-area: history;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(2rem, 3rem);
  place-items: center;
  max-height: 100%;
  overflow-y: scroll;

  & div:nth-child(odd) {
    background-color: ${(props) => props.theme.colors.primary};
  }

  & p {
    grid-column: span 4;
    font-weight: bold;
  }
`;

export default History;
