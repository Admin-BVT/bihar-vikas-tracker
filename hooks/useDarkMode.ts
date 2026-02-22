'use client'

import { useEffect, useState } from 'react'

export function useDarkMode() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Check saved preference
    const savedTheme = localStorage.getItem('theme')
    const shouldBeDark = savedTheme === 'dark'
    
    setIsDark(shouldBeDark)
    
    if (shouldBeDark) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleDark = () => {
    const newValue = !isDark
    setIsDark(newValue)
    
    if (newValue) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return { isDark, toggleDark, mounted }
}
