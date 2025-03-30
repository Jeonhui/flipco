import { globalStyle, style } from "@vanilla-extract/css"
import { theme } from "@design-system/theme/theme.css"
import { Color } from "@design-system/theme/themes/colors/colorSetVars.css"

const withAlpha = (color: Color, alpha: number): string => {
  return `rgb(from ${color} r g b / ${alpha})`
}

export const selectionContainer = style({
  transition: "height 0.4s ease-in-out,  max-height 0.4s ease-in-out",
  overflowY: "hidden",
  width: "100%"
})

export const selectionContainerInvisible = style({
  height: "0",
  transitionDelay: "0.4s"
})

export const selectionContainerVisible = style({
  height: "calc((100svh - 20rem) / 2)",
  transitionDelay: "0s"
})

globalStyle(`${selectionContainer} > *`, {
  transition: "opacity 0.3s ease-in-out"
})

globalStyle(`${selectionContainerInvisible} > *`, {
  transitionDelay: "0.4s",
  opacity: 0
})

globalStyle(`${selectionContainerVisible} > *`, {
  transitionDelay: "0",
  opacity: 1
})

export const selectionContainerTitle = style({
  width: "100%",
  padding: `0 ${theme.spaces.xSmall}`,
})

export const divider = style({
  alignSelf: "center",
  height: "0.05rem",
  width: "80%",
  backgroundColor: withAlpha(theme.colorSet.gray300, 0.4),
  margin: theme.spaces.small
})

export const itemContainer = style({
  height: "100%",
  flex: 1,
  width: "100%",
  overflow: "scroll",
  scrollBehavior: "smooth",
  scrollSnapType: "x mandatory",
  selectors: {
    "&::-webkit-scrollbar": {
      display: "none"
    }
  }
})