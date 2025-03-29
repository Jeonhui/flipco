import { globalStyle, style } from "@vanilla-extract/css"
import { theme } from "@design-system/theme/theme.css"
import { Color } from "@design-system/theme/themes/colors/colorSetVars.css"

const withAlpha = (color: Color, alpha: number): string => {
  return `rgb(from ${color} r g b / ${alpha})`
}

export const controlContainer = style({
  position: "relative",
  padding: `${theme.spaces.small} ${theme.spaces.large} calc(${theme.spaces.small} + 1rem) ${theme.spaces.large}`
})

export const nestingButtonWrapper = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
})

globalStyle(`${nestingButtonWrapper} > *:not(:nth-child(1))`, {
  position: "absolute"
})

export const controlButton = style({
  transition: "opacity 0.3s ease",
  borderRadius: theme.spaces.xSmall,
  padding: theme.spaces.xSmall
})

globalStyle(`${controlButton} svg`, {
  width: "2rem",
  height: "2rem"
})

export const buttonInvisible = style({
  opacity: 0,
  zIndex: 0
})

export const buttonVisible = style({
  opacity: 1
})

export const controlPanel = style({
  position: "absolute",
  bottom: "0.4rem",
  width: "10rem",
  zIndex: theme.zIndices.overlay,
  height: "0.6rem",
  transition: "padding 0.4s ease-in-out, height 0.4s ease-in-out, width 0.4s ease-in-out",
  backdropFilter: "blur(10px)",
  borderRadius: theme.spaces.medium,
  boxShadow: `0 0 0 0.05rem ${withAlpha(theme.colorSet.gray700, 0.4)} inset`,
  transitionDelay: "0.6s",
  padding: "0",
  selectors: {
    "&:hover": {
      width: "20rem",
      height: "20rem",
      transitionDelay: "0s",
      padding: "1rem"
    },
  },
});

globalStyle(`${controlPanel} > *`, {
  transition: "opacity 0.3s ease-in-out",
  transitionDelay: "0.4s",
  opacity: 0,
})

globalStyle(`${controlPanel}:hover > *`, {
  opacity: 1,
})