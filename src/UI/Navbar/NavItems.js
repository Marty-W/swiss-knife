import React from "react";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHourglassHalf,
  faTachometerAlt,
  faRedoAlt,
  faClipboardCheck,
} from "@fortawesome/free-solid-svg-icons";

const NavItems = () => (
  <StyledUl>
    <li>
      <Link to="/">
        <FontAwesomeIcon icon={faTachometerAlt} />
        <span>Dashboard</span>
      </Link>
    </li>
    <li>
      <Link to="/pomodoro">
        <FontAwesomeIcon icon={faHourglassHalf} />
        <span>Pomo</span>
      </Link>
    </li>
    <li>
      <Link to="/habits">
        <FontAwesomeIcon icon={faRedoAlt} />
        <span>Habits</span>
      </Link>
    </li>
    <li>
      <Link to="/todo">
        <FontAwesomeIcon icon={faClipboardCheck} />
        <span>Todos</span>
      </Link>
    </li>
  </StyledUl>
);

const StyledUl = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;

  & li a {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  & svg {
    color: white;
    display: block;
    padding: 0.1em;
  }

  & a {
    text-decoration: none;
    color: white;
  }
`;

export default NavItems;
