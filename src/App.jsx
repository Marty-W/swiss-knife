import React from 'react'
import styled from 'styled-components/macro'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Navbar from './components/UI/Navbar/Navbar'
import Home from './pages/Home'
import Pomodoro from './pages/Pomodoro'
import Todo from './pages/Todo'
import Habits from './pages/Habits'
import Header from './components/UI/Header'

const App = () => {
  return (
    <BodyWrapper>
      <Router>
        <Header />
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
  )
}

const BodyWrapper = styled.div`
  padding: 0.5em 1em;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default App
