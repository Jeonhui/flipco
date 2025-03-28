import ThemeMode from "../ThemeMode"
import { createContext } from "react"

declare global {
  interface Window {
    __theme: ThemeMode
    __setPreferredTheme: (newTheme: ThemeMode) => void
    __onThemeChange: (newTheme: ThemeMode) => void
  }
}

type ThemeContextProps = {
  theme: ThemeMode
  setTheme: (theme: ThemeMode) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

export default ThemeContext
export type { ThemeContextProps }
