import React from 'react'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'
import {
  AiOutlineHome,
  AiOutlineRedo,
  AiOutlineUnorderedList,
} from 'react-icons/ai'
import { IoIosTimer } from 'react-icons/io'

const NavItems = () => (
  <Wrapper>
    <Link to="/">
      <AiOutlineHome />
    </Link>

    <Link to="/pomodoro">
      <IoIosTimer />
    </Link>

    <Link to="/habits">
      <AiOutlineRedo />
    </Link>

    <Link to="/todo">
      <AiOutlineUnorderedList />
    </Link>
  </Wrapper>
)

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  stroke-width: 50%;

  & svg {
    color: ${(props) => props.theme.colors.tertiary};
    font-size: 1.5rem;
    stroke-width: 2;
  }
`

export default NavItems
