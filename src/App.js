import React from "react";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";

import Nav from "./UI/Nav";
import Home from "./Sections/Home/Home";
import Pomodoro from "./Sections/Pomodoro/Pomodoro";
import Todo from "./Sections/Todo/Todo";
import Habits from "./Sections/Habits/Habits";

const App = () => {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/pomodoro">
          <Pomodoro />
        </Route>
        <Route path="/todo">
          <Todo />
        </Route>
        <Route path="/habits">
          <Habits />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
