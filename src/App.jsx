import React from 'react'
import styled from 'styled-components/macro'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { PomoContextProvider } from './context/pomoContext'
import { AuthProvider } from './context/authContext'

import Navbar from './components/UI/Navbar/Navbar'
import Home from './pages/Home'
import Pomodoro from './pages/Pomodoro'
import Todo from './pages/Todo'
import Habits from './pages/Habits'
import Header from './components/UI/Header'
import Auth from './pages/Auth'

const App = () => {
  return (
    <BodyWrapper>
      <AuthProvider>
        <Router>
          <Header />
          <Route exact path="/auth" component={Auth} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/pomodoro">
              <PomoContextProvider>
                <Pomodoro />
              </PomoContextProvider>
            </Route>
            <Route path="/todo" component={Todo} />
            <Route path="/habits" component={Habits} />
          </Switch>
          <Navbar />
        </Router>
      </AuthProvider>
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
    'content';
`

export default App
