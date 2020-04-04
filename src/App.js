import React from "react";
import { BrowserRouter as Router, Switch, Link } from "react-router-dom";

import Nav from "./UI/Nav";

const App = () => {
  return (
    <Router>
      <Nav />
      <p>Swiss App</p>
    </Router>
  );
};

export default App;
