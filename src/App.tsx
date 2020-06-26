import React from 'react'
import styled from 'styled-components'
import { Switch, Route } from 'react-router-dom'
import { PomoProvider } from './context/PomoContext'

import Navbar from './components/UI/Navbar/Navbar'
import Home from './pages/Home'
import Pomodoro from './pages/Pomodoro'
import Todo from './pages/Todo'
import Habits from './pages/Habits'
import Header from './components/UI/Header'
import Auth from './pages/Auth'
import Session from './pages/Session'

// FIXME hacky grid templaterows

const App: React.FC = () => {
  return (
    <BodyWrapper>
      <Header />
      <Route exact path="/auth" component={Auth} />
      <Switch>
        <Route exact path="/session">
          <PomoProvider>
            <Session />
          </PomoProvider>
        </Route>
        <Route exact path="/pomodoro">
          <PomoProvider>
            <Pomodoro />
          </PomoProvider>
        </Route>
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
  grid-template-rows: 10% 84% 6%;
  grid-template-areas:
    'head head head'
    '. content .'
    'nav nav nav';
`

export default App
