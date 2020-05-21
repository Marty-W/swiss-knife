import React from 'react'
import { ThemeProvider } from 'styled-components/macro'

const themeOptions = {
  fonts: {
    dec: 'Amatic SC',
    text: 'Raleway',
  },
  colors: {
    grey: '#303036',
    red: '#CC2936',
    purple: '#3B3355',
    white: '#EAF2EF',
    dark: '#0F1020',
  },
}

const Theme = ({ children }) => (
  <ThemeProvider theme={themeOptions}>{children}</ThemeProvider>
)

export default Theme
