import { DefaultTheme } from 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    fonts: {
      primary: string
      secondary: string
    }
    colors: {
      primary: string
      secondary: string
      tertiary: string
      accent: string
      secondaryAccent: string
    }
  }
}

export const DarkTheme: DefaultTheme = {
  fonts: {
    primary: 'Lato',
    secondary: 'Unica One',
  },
  colors: {
    primary: '#141316',
    secondary: '#282A2A',
    tertiary: '#EFF6EE',
    accent: '#E63946',
    secondaryAccent: '#136F63',
  },
}

export const LightTheme: DefaultTheme = {
  fonts: {
    primary: 'Lato',
    secondary: 'Unica One',
  },
  colors: {
    primary: '#EFF6EE',
    secondary: '#E0E1E1',
    tertiary: '#141316',
    accent: '#F02D3A',
    secondaryAccent: '#136F63',
  },
}
