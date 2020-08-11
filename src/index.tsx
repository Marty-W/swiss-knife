import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import * as Sentry from '@sentry/react'
import { ToastProvider } from 'react-toast-notifications'
import App from './App'
import { AuthProvider } from './context/AuthContext'

Sentry.init({
  dsn:
    'https://96e6bc23dc5442eaac310d87bdf31f9a@o411474.ingest.sentry.io/5286715',
})

ReactDOM.render(
  <React.StrictMode>
    <ToastProvider autoDismiss autoDismissTimeout={4000} placement="top-center">
      <AuthProvider>
        <Router>
          <App />
        </Router>
      </AuthProvider>
    </ToastProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
