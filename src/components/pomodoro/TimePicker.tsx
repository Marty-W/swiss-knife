import React from 'react';
import styled from 'styled-components/';

import Card from '../UI/Card.styles';
import Button from '../UI/Button.styles';
import Rating from './Rating';
import Timer from './Timer';

interface Props {
  handlePomoStart?: () => void;
}

const TimePicker: React.FC<Props> = ({ handlePomoStart }) => (
  <Wrapper>
    <Timer />
    <StartButton onClick={handlePomoStart}>Start</StartButton>
    <Rating />
  </Wrapper>
);

const Wrapper = styled(Card)`
  grid-area: timer;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: 2fr 1fr;
  place-items: center;
  grid-template-areas:
    'lchevron timer rchevron'
    '. btn rating';
`;

const StartButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.accent};
  grid-area: btn;
  text-transform: uppercase;
  letter-spacing: 1.1px;
`;

export default TimePicker;
