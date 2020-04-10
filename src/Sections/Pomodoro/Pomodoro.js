import React from "react";
import styled from "styled-components/macro";
import { Route, Switch, Link } from "react-router-dom";

import Card from "../../UI/Card";
import { ReactComponent as Break } from "../../assets/svgs/break.svg";
import { ReactComponent as Free } from "../../assets/svgs/free.svg";

const Pomodoro = () => {
  return (
    <>
      <h1
        css={`
          text-align: center;
        `}
      >
        Pomodoro
      </h1>
      <CardWrapper>
        <Link to="/pomodoro/freemode">
          <Card>
            <h2>Free Mode</h2>
            <Free />
            <p>
              My style. Just pick a duration for your session and break and
              cycle these two. You can change the time after each.
            </p>
          </Card>
        </Link>
        <Link to="/pomodoro/breakmode">
          <Card>
            <h2>Break Mode</h2>
            <Break />
            <p>
              Classic Pomodoro style, developed by Francesco Cirillo. Pick your
              session duration, break duration and number of sessions to have a
              large break.{" "}
            </p>
          </Card>
        </Link>
      </CardWrapper>
    </>
  );
};

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 490px) {
    flex-direction: row;
  }
`;

export default Pomodoro;
