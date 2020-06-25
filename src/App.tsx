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
        <PomoProvider>
          <Route exact path="/session" component={Session} />
          <Route exact path="/pomodoro" component={Pomodoro} />
        </PomoProvider>
        <Route path="/habits" component={Habits} />
        <Route path="/todo" component={Todo} />
        <Route path="/" component={Home} />
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
    'head'
    'content'
    'nav';
`

export default App
