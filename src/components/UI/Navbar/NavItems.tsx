import {
  AiOutlineHome,
  AiOutlineRedo,
  AiOutlineUnorderedList,
} from 'react-icons/ai'

import { IoIosTimer } from 'react-icons/io'
import { NavLink } from 'react-router-dom'
import React from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components/macro'

const NavItems: React.FC = () => (
  <Wrapper>
    <NavItem exact to="/">
      <NavDesc>Home</NavDesc>
      <NavSVG>
        <AiOutlineHome />
      </NavSVG>
    </NavItem>

    <NavItem to="/pomodoro">
      <NavDesc>Pomodoro</NavDesc>
      <NavSVG>
        <IoIosTimer />
      </NavSVG>
    </NavItem>

    <NavItem to="/habits">
      <NavDesc>Habits</NavDesc>
      <NavSVG>
        <AiOutlineRedo />
      </NavSVG>
    </NavItem>

    <NavItem to="/todo">
      <NavDesc>Tasks</NavDesc>
      <NavSVG>
        <AiOutlineUnorderedList />
      </NavSVG>
    </NavItem>
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  height: 100%;
  align-items: center;
  @media (min-width: 520px) {
    flex-direction: column;
    justify-content: start;
    margin-top: 2rem;
  }

  @media (min-width: 1000px) {
    height: 100%;
    justify-content: center;
    margin-top: 0;
  }
`

const NavItem = motion.custom(styled(NavLink)`
  @media (min-width: 520px) {
    margin-bottom: 2rem;
  }

  &.active {
    \ & svg {
      fill: ${(props) => props.theme.colors.accent};
    }

    & span {
      color: ${(props) => props.theme.colors.accent};
    }
  }
`)

const NavSVG = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & svg {
    color: ${(props) => props.theme.colors.tertiary};
    font-size: 1.5rem;
    stroke-width: 2;
  }

  @media (min-width: 1000px) {
    & svg {
      display: none;
    }
  }
`

const NavDesc = styled.span`
  display: none;
  text-transform: lowercase;
  font-family: ${(props) => props.theme.fonts.primary};
  color: ${(props) => props.theme.colors.tertiary};
  font-size: 1.4rem;

  @media (min-width: 1000px) {
    display: inline-block;
  }
`

export default NavItems
