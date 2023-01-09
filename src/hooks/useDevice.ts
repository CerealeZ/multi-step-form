import { useState, useEffect } from "react"

export function useDevice<T, S>(
  sizes: T[],
  checkFn: (sizes: T[], windowWidth: number) => S
) {
  const [device, setDevice] = useState<S | null>(null)
  useEffect(function getDevice() {
    const handleResize = () => {
      const device = checkFn(sizes, window.innerWidth)
      setDevice(device)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return device
}
