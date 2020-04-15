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
      <FontAwesomeIcon icon={faTachometerAlt} />
      <Link to="/">Dashboard</Link>
    </li>
    <li>
      <FontAwesomeIcon icon={faHourglassHalf} />
      <Link to="/pomodoro">Pomo</Link>
    </li>
    <li>
      <FontAwesomeIcon icon={faRedoAlt} />
      <Link to="/habits">Habits</Link>
    </li>
    <li>
      <FontAwesomeIcon icon={faClipboardCheck} />
      <Link to="/todo">Todos</Link>
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

  & li {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  & svg {
    color: white;
    display: block;
  }

  & a {
    text-decoration: none;
    color: white;
  }
`;

export default NavItems;
