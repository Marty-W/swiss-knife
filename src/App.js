import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";

import Nav from "./UI/Nav";
import Home from "./Sections/Home/Home";
import Pomodoro from "./Sections/Pomodoro/Pomodoro";
import Todo from "./Sections/Todo/Todo";
import Habits from "./Sections/Habits/Habits";
import FreeMode from "./Sections/Pomodoro/FreeMode/FreeMode";
import BreakMode from "./Sections/Pomodoro/BreakMode/BreakMode";

const App = () => {
  return (
    <BodyWrapper>
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/pomodoro">
            <Pomodoro />
          </Route>
          <Route path="/todo">
            <Todo />
          </Route>
          <Route path="/habits">
            <Habits />
          </Route>
          <Route component={FreeMode} path="/pomodoro/freemode" />
          <Route component={BreakMode} path="/pomodoro/breakmode" />
        </Switch>
      </Router>
    </BodyWrapper>
  );
};

const BodyWrapper = styled.div`
  padding: 1em 2em;
`;

export default App;
