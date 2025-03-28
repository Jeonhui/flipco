import { globalStyle, style } from "@vanilla-extract/css"
import { theme } from "@design-system/theme/theme.css"

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
      boxShadow: `0 0 0 0.05rem ${theme.colors.text.textDim4} inset`
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
  boxShadow: `0 0 0 0.05rem ${theme.colors.text.textDim4} inset`
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

export const opacitySlider = style({
  WebkitAppearance: "none",
  width: "5rem",
  background: "transparent",
  borderRadius: "0.4rem",
  outline: "none",
  transition: "background 0.2s",

  selectors: {
    "&:hover": {
      background: theme.colorSet.gray700
    },
    "&::-webkit-slider-runnable-track": {
      width: "100%",
      height: "0.5rem",
      background: `linear-gradient(to right, transparent 0%, ${theme.colorSet.gray800} 100%)`,
      borderRadius: "0.25rem"
    },
    "&::-webkit-slider-thumb": {
      WebkitAppearance: "none",
      width: "1rem",
      marginTop: "-0.25rem",
      aspectRatio: "1",
      background: theme.colorSet.gray800,
      borderRadius: "50%",
      cursor: "pointer",
      transition: "background 0.2s"
    },
    "&::-webkit-slider-thumb:hover": {
      background: theme.colorSet.gray700,
      boxShadow: `0 0 0 0.025rem ${theme.colorSet.gray800} inset`
    },
    "&::-moz-range-track": {
      width: "100%",
      height: "0.5rem",
      background: `linear-gradient(to right, transparent 0%, ${theme.colorSet.gray800} 100%)`,
      borderRadius: "0.25rem",
      padding: "0.02rem"
    },
    "&::-moz-range-thumb": {
      WebkitAppearance: "none",
      width: "1rem",
      marginTop: "-0.25rem",
      aspectRatio: "1",
      background: theme.colorSet.gray800,
      borderRadius: "50%",
      cursor: "pointer",
      transition: "background 0.2s"
    },
    "&::-moz-range-thumb:hover": {
      background: theme.colorSet.gray700,
      boxShadow: `0 0 0 0.025rem ${theme.colorSet.gray800} inset`
    }
  }
})

export const showButton = style({
  position: "absolute",
  left: "1rem",
  opacity: 0,
  pointerEvents: "none",
  transition: "opacity 0.3s ease",
  "@media": {
    "screen and (max-width: 480px)": {
      left: "0.05rem"
    }
  }
})

export const showButtonVisible = style({
  opacity: 1,
  pointerEvents: "auto"
})

export const showButtonIcon = style({
  width: "2rem",
  height: "3rem !important"
})