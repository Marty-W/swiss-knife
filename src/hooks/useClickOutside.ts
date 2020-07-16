import React, { useEffect, MouseEvent } from 'react'

const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  callback: () => void,
): void => {
  const handleClick = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback()
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  })
}

export default useClickOutside
