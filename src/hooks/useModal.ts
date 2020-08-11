import { useState } from 'react'

const useModal = (open?: boolean) => {
  const [isShowing, setIsShowing] = useState(open || false)

  const toggle = () => {
    setIsShowing(!isShowing)
  }

  return [isShowing, toggle] as const
}

export default useModal
