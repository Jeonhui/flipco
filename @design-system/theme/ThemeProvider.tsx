"use client"

import "./global.css"
import React, { PropsWithChildren, useEffect, useState } from "react"
import ThemeMode from "./ThemeMode"
import ThemeContext from "./contexts/ThemeContext"
import {
  darkModeColorTheme,
  lightModeColorTheme,
} from "./themes/colors/colorTheme.css"
import fontVariables from "./themes/fonts/fontVariables"

const colorThemeScript = `
  (function() {
    window.__onThemeChange = function() {}
    function setTheme(newTheme) {
      window.__theme = newTheme
      preferredTheme = newTheme
      document.documentElement.setAttribute('data-theme', newTheme)
      document.documentElement.className = newTheme === 'dark' ? '${darkModeColorTheme}' : '${darkModeColorTheme}'
      ${fontVariables.map((variable) => `document.documentElement.classList.add('${variable}')`).join("\n")}
      window.__onThemeChange(newTheme)
    }
    var preferredTheme
    try {
      preferredTheme = localStorage.getItem('theme')
    } catch (err) {}
    window.__setPreferredTheme = function(newTheme) {
      setTheme(newTheme)
      try {
        localStorage.setItem('theme', newTheme)
      } catch (err) {}
    }
    var darkQuery = window.matchMedia('(prefers-color-scheme: dark)')
    darkQuery.addListener(function(e) {
      window.__setPreferredTheme(e.matches ? 'dark' : 'light')
    })
    setTheme(preferredTheme || (darkQuery.matches ? 'dark' : 'light'))
  })()
`

type ThemeProviderProps = PropsWithChildren

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    return typeof window !== "undefined" && window.__theme
      ? window.__theme
      : "light"
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.__onThemeChange = (newTheme: ThemeMode) => setTheme(newTheme)
    }
    return () => {
      if (typeof window === "undefined") return
      window.__onThemeChange = () => undefined
    }
  }, [])

  const setThemeState = (newTheme: ThemeMode) => {
    window.__setPreferredTheme(newTheme)
  }

  const toggleTheme = () => {
    window.__setPreferredTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme: setThemeState, toggleTheme }}
    >
      <script dangerouslySetInnerHTML={{ __html: colorThemeScript }} />
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
