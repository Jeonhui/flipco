import { globalStyle, style } from "@vanilla-extract/css"
import { theme } from "@design-system/theme/theme.css"
import { Color } from "@design-system/theme/themes/colors/colorSetVars.css"

const withAlpha = (color: Color, alpha: number): string => {
  return `rgb(from ${color} r g b / ${alpha})`
}

export const selectionContainer = style({
  transition: "height 0.4s ease-in-out, max-height 1s ease-in-out, opacity 0.4s ease-in-out 0.4s",
  overflowY: "hidden",
  width: "100%",
})

export const selectionContainerInvisible = style({
  maxHeight: "0"
  // transitionDelay: "0.3s"
})

export const selectionContainerVisible = style({
  maxHeight: "100svh"
  // transitionDelay: "0s"
})

globalStyle(`${selectionContainer} > *`, {
  transition: "opacity 0.3s ease-in-out"
})

globalStyle(`${selectionContainerInvisible} > *`, {
  // transitionDelay: "0",
  opacity: "0 !important"
})

globalStyle(`${selectionContainerVisible} > *`, {
  // transitionDelay: "0.4s",
  opacity: 1
})

export const selectionItemContainer = style({
  position: "relative",
  width: "100%",
  height: "100%"
})

export const selectionItemContainerTitle = style({
  width: "100%",
  padding: `0 ${theme.spaces.xSmall}`
})

export const divider = style({
  alignSelf: "center",
  height: "0.05rem",
  width: "80%",
  backgroundColor: withAlpha(theme.colorSet.gray300, 0.4),
  margin: theme.spaces.small
})

export const itemContainer = style({
  position: "relative",
  flex: 1,
  width: "100%",
  maxHeight: "calc((100svh - 22rem) / 2)",
  overflow: "scroll",
  scrollBehavior: "smooth",
  scrollSnapType: "x mandatory",
  selectors: {
    "&::-webkit-scrollbar": {
      display: "none"
    }
  }
})

export const itemSpacer = style({
  width: "10rem"
})

export const itemScrollContainer = style({
  height: "100%"
})