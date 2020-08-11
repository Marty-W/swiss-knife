import { useEffect, useState } from 'react'

const useTheme = () => {
  const [theme, setTheme] = useState('dark')

  const setMode = (mode: string) => {
    window.localStorage.setItem('theme', mode)
    setTheme(mode)
  }

  const themeToggler = () => {
    theme === 'light' ? setMode('dark') : setMode('light')
  }

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme')
    localTheme && setTheme(localTheme)
  }, [])
  return [theme, themeToggler] as const
}

export default useTheme
