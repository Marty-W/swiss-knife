import React from 'react'
import styled from 'styled-components/macro'
import { Switch, Route } from 'react-router-dom'

import { PomoContextProvider } from './context/pomoContext'

import Navbar from './components/UI/Navbar/Navbar'
import Home from './pages/Home'
import Pomodoro from './pages/Pomodoro'
import Todo from './pages/Todo'
import Habits from './pages/Habits'
import Header from './components/UI/Header'
import Auth from './pages/Auth'
import FocusMode from './pages/FocusMode'

// TODO consider moving auth again below header....

const App = () => {
  return (
    <BodyWrapper>
      <Header />
      <Route exact path="/auth" component={Auth} />
      <Switch>
        <PomoContextProvider>
          <Route exact path="/session" component={FocusMode} />
          <Route exact path="/pomodoro" component={Pomodoro} />
        </PomoContextProvider>
        <Route exact path="/habits" component={Habits} />
        <Route exact path="/todo" component={Todo} />
        <Route exact path="/" component={Home} />
      </Switch>
      <Navbar />
    </BodyWrapper>
  )
}

const BodyWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: 10% auto 6%;
  grid-template-areas:
    'head'
    'content'
    'nav';
`

export default App
