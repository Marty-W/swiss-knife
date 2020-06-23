import React from 'react'
import { ThemeProvider } from 'styled-components'

import { DefaultTheme } from 'styled-components'

const themeOptions: DefaultTheme = {
  fonts: {
    primary: 'Lato',
    secondary: 'Unica One',
  },
  colors: {
    primary: '#101119',
    secondary: '#1F2533',
    tertiary: '#EFF6EE',
    accent: '#F02D3A',
  },
}

const Theme: React.FC = ({ children }) => (
  <ThemeProvider theme={themeOptions}>{children}</ThemeProvider>
)

export default Theme
