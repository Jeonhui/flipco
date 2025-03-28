import { globalStyle, style } from "@vanilla-extract/css"
import { theme } from "../../../../theme/theme.css"

export const themeToggleButton = style({
  color: theme.colors.primary,
})

export const iconContainer = style({
  height: "fit-content",
})

globalStyle(`${iconContainer} > div`, {
  ...theme.alignments.rowCenter,
})

export const icon = style({
  transition: "opacity 0.3s ease-in-out",
})

export const darkModeIcon = style({})

export const lightModeIcon = style({})
