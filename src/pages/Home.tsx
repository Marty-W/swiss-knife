import { AiOutlineRedo, AiOutlineUnorderedList } from 'react-icons/ai'
import { IoIosTimer } from 'react-icons/io'
import React from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components/macro'
import MasterPlanSVG from '../components/home/MasterPlanSVG'

const Home: React.FC = () => (
  <Wrapper>
    <Heading>Swiss Knife</Heading>
    <SubHeader>The productivity multi-tool</SubHeader>
    <Desc>
      <p>
        There is no ultimate productivity system. There are only tools. This app
        combines three major ones.
      </p>
    </Desc>
    <Features>
      <li>
        <IoIosTimer />
        Pomodoro tracker
      </li>
      <li>
        <AiOutlineRedo />
        Habit Tracker
      </li>
      <li>
        <AiOutlineUnorderedList />
        Todo List
      </li>
    </Features>
    <SvgWrapper>
      <MasterPlanSVG />
    </SvgWrapper>
  </Wrapper>
)

const Wrapper = styled.div`
  grid-area: content;
  text-align: center;
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 0.2fr 0.1fr 0.3fr 0.3fr 0.2fr 40vh;
  grid-template-areas:
    'header header'
    'subheader subheader'
    'desc desc'
    'features features'
    'features features'
    'svg svg';

  & button {
    place-self: center;
    width: 70%;
    max-width: 150px;
  }

  @media (min-width: 1000px) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 0.3fr 0.1fr repeat(3, 1fr);
    grid-template-areas:
      'header header header header'
      'subheader subheader subheader subheader'
      'desc desc svg svg'
      'features features svg svg'
      '. . svg svg';
  }
`

const Heading = styled.h1`
  font-size: 3rem;
  font-family: ${(props) => props.theme.fonts.secondary};
  text-transform: uppercase;
  grid-area: header;
  align-self: end;
`

const SubHeader = styled.span`
  font-family: ${(props) => props.theme.fonts.secondary};
  font-size: 1.3rem;
  text-transform: uppercase;
  grid-area: subheader;
`
const Features = styled(motion.ul)`
  list-style: none;
  margin: 0;
  padding: 0;
  grid-area: features;
  justify-self: start;
  align-self: center;
  & li {
    display: flex;
    align-items: center;
    font-size: 1.2rem;
    margin-bottom: 1em;

    & svg {
      margin-right: 0.5em;
    }
  }

  @media (min-width: 1000px) {
    justify-self: center;
  }
`

const Desc = styled.div`
  grid-area: desc;
  font-style: italic;
  padding: 0 1rem;
  line-height: 1.3;
  align-self: center;
`

const SvgWrapper = styled.div`
  grid-area: svg;

  & svg {
    width: 100%;
    height: 100%;
    display: block;
  }
`

export default Home
