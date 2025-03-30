import { globalStyle, style } from "@vanilla-extract/css"
import { theme } from "@design-system/theme/theme.css"
import { Color } from "@design-system/theme/themes/colors/colorSetVars.css"

const withAlpha = (color: Color, alpha: number): string => {
  return `rgb(from ${color} r g b / ${alpha})`
}

export const controlContainer = style({
  position: "relative",
  padding: `${theme.spaces.small} ${theme.spaces.large} calc(${theme.spaces.small} + 1.4rem) ${theme.spaces.large}`,
})

export const nestingIconButton = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
})

globalStyle(`${nestingIconButton} > *:not(:nth-child(1))`, {
  position: "absolute"
})

export const controlItemButton = style({
  transition: "opacity 0.3s ease",
  borderRadius: theme.spaces.xSmall,
  padding: theme.spaces.xSmall
})

globalStyle(`${controlItemButton} svg`, {
  width: "1.2rem",
  height: "1.2rem",
})

export const controlItemLargeButton = style({
  transition: "opacity 0.3s ease",
  borderRadius: theme.spaces.xSmall,
  padding: theme.spaces.xSmall
})

globalStyle(`${controlItemLargeButton} svg`, {
  width: "1.6rem",
  height: "1.6rem",
})

export const iconInvisible = style({
  opacity: 0,
  zIndex: 0
})

export const iconVisible = style({
  opacity: 1
})

export const controlPanel = style({
  position: "absolute",
  zIndex: theme.zIndices.overlay,
  backdropFilter: "blur(10px)",
  borderRadius: theme.spaces.medium,
  boxShadow: `0 0 0 0.05rem ${withAlpha(theme.colorSet.gray700, 0.4)} inset`,
  backgroundColor: withAlpha(theme.colorSet.gray50, 0.1),
  transition: "background-color 0.4s ease-in-out, padding 0.4s ease-in-out, height 0.4s ease-in-out,  max-height 0.4s ease-in-out, width 0.4s ease-in-out",
  overflow: "hidden",
  bottom: "0.5rem",

  // width: "100%",
  // transitionDelay: "0.4s",
  // padding: "0",'
  // maxHeight: "0.5rem",

  width: "20rem",
  transitionDelay: "0s",
  padding: "1rem",


  selectors: {
    "&:hover": {
      backgroundColor: "transparent",
      height: "fit-content",
      width: "20rem",
      maxHeight: "calc(100svh - 1rem)",
      transitionDelay: "0s",
      padding: "1rem",

      "@media": {
        "screen and (max-width: 480px)": {
          width: "80svw",
        }
      },
    }
  }
})

globalStyle(`${controlPanel} > *`, {
  transition: "opacity 0.3s ease-in-out",
  // transitionDelay: "0.4s",
  // opacity: 0
})

globalStyle(`${controlPanel}:hover > *`, {
  opacity: 1
})

export const itemContainer = style({
  padding: `0 ${theme.spaces.small}`
})

export const volumeControl = style({
  flex: 1
})

export const volumeSlider = style({
  width: "100%",
  flex: 1
})


export const divider = style({
  alignSelf: "center",
  height: "0.05rem",
  width: "80%",
  backgroundColor: withAlpha(theme.colorSet.gray300, 0.4),
  margin: theme.spaces.small
})

export const mainControlPanel = style({
  borderRadius: theme.spaces.small,
  padding: theme.spaces.small,
  backgroundColor: withAlpha(theme.colorSet.gray700, 0.4)
})

export const mainControlPanelTitle = style({
  width: "100%"
})

export const timeContainer = style({
  fontVariantNumeric: "tabular-nums"
})

export const youtubeControls = style({
  alignSelf: "center"
})