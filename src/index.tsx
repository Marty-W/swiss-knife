/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'

import GlobalStyle from './theme/global-style'
import Theme from './theme/Theme'
import { AuthProvider } from './context/AuthContext'

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <Theme>
          <GlobalStyle />
          <App />
        </Theme>
      </Router>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
