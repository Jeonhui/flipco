import { style } from "@vanilla-extract/css"
import { theme } from "@design-system/theme/theme.css"
import { Color } from "@design-system/theme/themes/colors/colorSetVars.css"

export const videoWrapper = style({
  position: 'relative',
  width: "100%",
  height: "100%",
  overflow: "hidden",
})

export const video = style({
  width: "100%",
  height: "100%",
  objectFit: "cover",
})

export const videoInactive = style({
  opacity: 0
})

export const videoActive = style({
  opacity: 1
})

const withAlpha = (color: Color, alpha: number): string => {
  return `rgb(from ${color} r g b / ${alpha})`
}

export const videoBottomEffect = style({
  position: "absolute",
  bottom: 0,
  width: "100%",
  height: "24rem",
  background: `linear-gradient(to top, ${theme.colors.background}, ${withAlpha(theme.colors.background, 0)})`,
})