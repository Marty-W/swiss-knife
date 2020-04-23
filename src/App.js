import React from "react";
import styled from "styled-components/macro";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./UI/Navbar/Navbar";
import Home from "./Sections/Home/Home";
import Pomodoro from "./Sections/Pomodoro/Pomodoro";
import Todo from "./Sections/Todo/Todo";
import Habits from "./Sections/Habits/Habits";
import Logo from "./UI/Logo";

const App = () => {
  return (
    <BodyWrapper>
      <Router>
        <Logo />
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
        </Switch>
        <Navbar />
      </Router>
    </BodyWrapper>
  );
};

const BodyWrapper = styled.div`
  padding: 1em 2em;
`;

export default App;
