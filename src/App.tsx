import { Route, Switch, useHistory } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'
import React, { Suspense, lazy } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { captureException } from '@sentry/react'
import { LightTheme, DarkTheme } from './theme/theme'
import Header, { Knife } from './components/UI/Header'
import Navbar from './components/UI/Navbar/Navbar'
import { PomoProvider } from './context/PomoContext'
import Session from './pages/Session'
import useTheme from './hooks/useTheme'
import GlobalStyle from './theme/global-style'
import useCurrentUser from './hooks/useCurrentUser'
import Spinner from './components/UI/Spinner'
import ErrorFallback from './components/UI/ErrorFallback'

const Habits = lazy(() => import('./pages/Habits'))
const Todo = lazy(() => import('./pages/Todo'))
const Pomodoro = lazy(() => import('./pages/Pomodoro'))
const Home = lazy(() => import('./pages/Home'))

const App: React.FC = () => {
  const [theme, themeToggle] = useTheme()
  const user = useCurrentUser()
  const history = useHistory()
  return (
    <ThemeProvider theme={theme === 'light' ? LightTheme : DarkTheme}>
      <GlobalStyle />
      <BodyWrapper>
        <Header themeToggle={themeToggle} />
        <Logo>
          <Knife onClick={() => history.push('/')} />
        </Logo>
        {!user ? (
          <LazySpinner />
        ) : (
          <Suspense fallback={<LazySpinner />}>
            <ErrorBoundary
              FallbackComponent={ErrorFallback}
              onError={(err) => captureException(err)}
            >
              <Switch>
                <Route path="/session">
                  <PomoProvider>
                    <Session />
                  </PomoProvider>
                </Route>
                <Route path="/pomodoro">
                  <PomoProvider>
                    <Pomodoro />
                  </PomoProvider>
                </Route>
                <Route path="/habits" component={Habits} />
                <Route path="/todo" component={Todo} />
                <Route path="/" component={Home} />
              </Switch>
            </ErrorBoundary>
          </Suspense>
        )}
        <Navbar />
      </BodyWrapper>
    </ThemeProvider>
  )
}
const BodyWrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: 7vh 1fr 7vh;
  grid-row-gap: 1rem;
  grid-template-columns: 0.13fr 2fr 0.15fr;
  grid-template-areas:
    'head head head'
    '. content .'
    'nav nav nav';

  @media (min-width: 520px) {
    grid-row-gap: 0;
    grid-template-columns: minmax(50px, 80px) 0.1fr 1.5fr 0.1fr;
    grid-template-rows: 5rem 2fr 5rem;
    grid-template-areas:
      'logo . head head'
      'nav . content .'
      'nav . . .';
  }

  @media (min-width: 1000px) {
    grid-template-columns: 15rem 2rem 1fr 2rem;
    grid-template-rows: 0.3fr 2fr 0.8fr;
    grid-template-areas:
      'logo . . .'
      'nav . content .'
      'head . content .';
  }
`

const Logo = styled.div`
  grid-area: logo;
  display: none;
  width: 100%;
  height: 100%;
  cursor: pointer;

  @media (min-width: 520px) {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.colors.secondary};

    & svg {
      display: block;
    }
  }
`

const LazySpinner = styled(Spinner)`
  grid-area: content;
`

export default App
