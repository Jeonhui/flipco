import { globalStyle, style } from "@vanilla-extract/css"
import { theme } from "@design-system/theme/theme.css"
import { Color } from "@design-system/theme/themes/colors/colorSetVars.css"

const withAlpha = (color: Color, alpha: number): string => {
  return `rgb(from ${color} r g b / ${alpha})`
}

export const mainContainer = style({})

export const popupContainer = style({
  position: "absolute",
  width: "fit-content",
  padding: "0.4rem",
  opacity: 1,
  transition: "opacity 4s ease",
  maxWidth: "100%"
})

export const popupContainerHiddenMoveTransition = style({
  transition: "top 0.3s ease, left 0.3s ease, opacity 0.3s ease"
})

export const popupContainerHidden = style({
  opacity: 0
})

export const popupContentContainer = style({
  position: "relative",
  width: "fit-content",
  zIndex: theme.zIndices.overlay,
  userSelect: "none",
  overflow: "hidden",
  padding: `${theme.spaces.xLarge} 0.3rem 0.3rem 0.3rem`,
  borderRadius: theme.spaces.small,
  transition: "opacity 0.3s ease, backdrop-filter 0.3s ease, box-shadow 0.3s ease",
  boxShadow: `0 0 0 0.05rem transparent inset`,
  maxWidth: "100%",
  "@media": {
    "screen and (max-width: 480px)": {
      backdropFilter: "blur(10rem)",
      boxShadow: `0 0 0 0.05rem ${withAlpha(theme.colors.text.textDim4, 0.24)} inset`
    }
  }
})

export const contentWrapper = style({
  position: "relative",
  zIndex: `calc(${theme.zIndices.overlay} + 1)`,
  maxWidth: "100%"
})

globalStyle(`${popupContainer}:hover > ${popupContentContainer}`, {
  backdropFilter: "blur(10rem)",
  boxShadow: `0 0 0 0.05rem ${withAlpha(theme.colors.text.textDim4, 0.24)} inset`
})

globalStyle(`${popupContainer} > ${popupContentContainer} > *:not(${contentWrapper})`, {
  "@media": {
    "screen and (min-width: 480px)": {
      transition: "opacity 0.3s ease",
      opacity: 0
    }
  }
})

globalStyle(`${popupContainer}:hover > ${popupContentContainer} > *:not(${contentWrapper})`, {
  opacity: 1
})

export const popupContainerResizeOverlay = style({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: theme.zIndices.overlay
})

export const resizing = style({
  zIndex: `calc(${theme.zIndices.overlay} + 4)`
})

export const popupContainerDrayOverlay = style({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: theme.zIndices.overlay
})

export const dragging = style({
  zIndex: `calc(${theme.zIndices.overlay} + 4)`
})

export const statusBarContainer = style({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  ...theme.alignments.rowCenter,
  height: theme.spaces.xLarge.toString(),
  padding: `0 ${theme.spaces.small}`,
  zIndex: `calc(${theme.zIndices.overlay} + 1)`,
  pointerEvents: "none"
})

globalStyle(`${statusBarContainer} > *`, {
  pointerEvents: "auto",
  opacity: 0.7,
  zIndex: `calc(${theme.zIndices.overlay} + 20)`
})

export const spacer = style({
  flex: 1,
  width: "100%"
})

export const showButton = style({
  position: "absolute",
  opacity: 0,
  pointerEvents: "none",
  backgroundColor: withAlpha(theme.colors.text.textDim4, 0.24),
  transition: "opacity 0.3s ease",
  padding: "1rem 0.1rem",
  borderRadius: theme.spaces.small,
})

export const showButtonVisible = style({
  opacity: 0.8,
  pointerEvents: "auto"
})

export const showButtonIcon = style({
  width: "2rem",
  height: "3rem !important"
})