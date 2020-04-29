import React from 'react'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHourglassHalf,
  faHome,
  faRedoAlt,
  faClipboardCheck,
} from '@fortawesome/free-solid-svg-icons'

const NavItems = () => (
  <StyledUl>
    <li>
      <Link to="/">
        <FontAwesomeIcon icon={faHome} />
      </Link>
    </li>
    <li>
      <Link to="/pomodoro">
        <FontAwesomeIcon icon={faHourglassHalf} />
      </Link>
    </li>
    <li>
      <Link to="/habits">
        <FontAwesomeIcon icon={faRedoAlt} />
      </Link>
    </li>
    <li>
      <Link to="/todo">
        <FontAwesomeIcon icon={faClipboardCheck} />
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
  }
`

export default NavItems
