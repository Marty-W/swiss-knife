import React from 'react';
import styled from 'styled-components/';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { usePomo } from '../../context/PomoContext';

const Timer: React.FC = () => {
  const [state, dispatch] = usePomo();
  const { duration, isBreak } = state;

  const handleDuration = (type: 'plus' | 'minus') => {
    isBreak
      ? dispatch({ type: 'BREAK', payload: type })
      : dispatch({ type: 'DUR', payload: type });
  };
  return (
    <>
      <LeftChevron
        disabled={duration.as('milliseconds') === 0}
        onClick={() => handleDuration('minus')}
      >
        <BsChevronLeft />
      </LeftChevron>
      <Time>{duration.toFormat('mm:ss')}</Time>
      <RightChevron onClick={() => handleDuration('plus')}>
        <BsChevronRight />
      </RightChevron>
    </>
  );
};

export default Timer;

const LeftChevron = styled.button`
  grid-area: lchevron;
  cursor: pointer;
  background: none;
  border: none;
  font-size: 2.5rem;
  color: ${(props) => props.theme.colors.tertiary};
  padding: 0;
`;

const RightChevron = styled(LeftChevron)`
  grid-area: rchevron;
`;

const Time = styled.span`
  font-family: ${(props) => props.theme.fonts.secondary};
  font-size: 3.5rem;
  color: ${(props) => props.theme.colors.tertiary};
  display: inline-block;
  user-select: none;

  //TODO weird centering, timer and chevrons not really in one line
`;
