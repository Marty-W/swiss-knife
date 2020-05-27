import React from 'react'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'
import {
  AiOutlineHome,
  AiOutlineHourglass,
  AiOutlineRedo,
} from 'react-icons/ai'
import { FcTodoList } from 'react-icons/fc'

const NavItems = () => (
  <StyledUl>
    <li>
      <Link to="/">
        <AiOutlineHome />
      </Link>
    </li>
    <li>
      <Link to="/pomodoro">
        <AiOutlineHourglass />
      </Link>
    </li>
    <li>
      <Link to="/habits">
        <AiOutlineRedo />
      </Link>
    </li>
    <li>
      <Link to="/todo">
        <FcTodoList />
      </Link>
    </li>
  </StyledUl>
)

const StyledUl = styled.ul`
  list-style: none;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-around;
  align-items: center;

  & li {
    flex: 1;
    border-right: 1px solid ${(props) => props.theme.colors.white};
  }

  & li:last-of-type {
    border: none;
  }

  & svg {
    color: ${(props) => props.theme.colors.white};
    display: block;
    margin: 0 auto;
    position: relative;

    &:hover {
      color: ${(props) => props.theme.colors.dark};
    }
    //todo repair blue color
  }
`

export default NavItems
