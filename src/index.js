/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'

import GlobalStyle from './theme/global-style'
import Theme from './theme/Theme'
import { AuthProvider } from './context/authContext'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <Theme>
          <GlobalStyle />
          <App />
        </Theme>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
