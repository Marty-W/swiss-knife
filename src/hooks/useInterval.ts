/* eslint-disable import/prefer-default-export */
/* eslint-disable consistent-return */
import { useEffect, useRef } from 'react'

function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef<Function | null>(null)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    function tick() {
      savedCallback.current && savedCallback.current()
    }
    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
    return
  }, [delay])
}

export { useInterval }
