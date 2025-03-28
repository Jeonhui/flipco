import { globalStyle, style } from "@vanilla-extract/css"
import { theme } from "@design-system/theme/theme.css"

export const youtubePlayerContainer = style({
  position: "absolute",
  width: "fit-content",
  padding: "0.4rem"
})

export const youtubePlayer = style({
  position: "relative",
  width: "fit-content",
  zIndex: theme.zIndices.overlay,
  userSelect: "none",
  overflow: "hidden",
  padding: `${theme.spaces.xLarge} 0.3rem 0.3rem 0.3rem`,
  borderRadius: theme.spaces.small,
  transition: "opacity 0.3s ease, backdrop-filter 0.3s ease, box-shadow 0.3s ease",
  boxShadow: `0 0 0 0.05rem transparent inset`
})

export const youtubeWrapper = style({
  position: "relative",
  zIndex: `calc(${theme.zIndices.overlay} + 1)`,
})

globalStyle(`${youtubePlayerContainer}:hover > ${youtubePlayer}`, {
  backdropFilter: "blur(10rem)",
  boxShadow: `0 0 0 0.05rem ${theme.colors.text.textDim4} inset`
})

globalStyle(`${youtubePlayerContainer} > ${youtubePlayer} > *:not(${youtubeWrapper})`, {
  transition: "opacity 0.3s ease",
  opacity: 0
})

globalStyle(`${youtubePlayerContainer}:hover > ${youtubePlayer} > *:not(${youtubeWrapper})`, {
  opacity: 1
})

export const dragOverlay = style({
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

export const statusContainer = style({
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

globalStyle(`${statusContainer} > *`, {
  pointerEvents: "auto",
  opacity: 0.7,
  zIndex: `calc(${theme.zIndices.overlay} + 20)`
})

export const resizeButton = style({
  width: "16px",
  height: "16px",
  backgroundColor: "white",
  cursor: "nesw-resize"
})

export const spacer = style({
  flex: 1,
  width: "100%"
})

export const youtubeIframeWrapper = style({
  position: "absolute",
  display: "flex",
  width: "100%",
  height: "100%",
  borderRadius: theme.spaces.small,
  overflow: "hidden",
  zIndex: `calc(${theme.zIndices.overlay} + 1)`,
  transition: "opacity 0.8s ease"
})

export const youtubeIframeWrapperInvisible = style({
  opacity: 0
})

export const youtubeIframeWrapperVisible = style({
  opacity: 1
})

globalStyle(`${youtubeIframeWrapper} > *`, {
  zIndex: `calc(${theme.zIndices.overlay} + 1)`
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
    // 트랙 (크롬, 엣지)
    "&::-webkit-slider-runnable-track": {
      width: "100%",
      height: "0.5rem",
      background: `linear-gradient(to right, transparent 0%, ${theme.colorSet.gray800} 100%)`,
      borderRadius: "0.25rem"
    },

    // 썸(손잡이) - 크롬, 엣지
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

export const youtubeErrorContainer = style({
  ...theme.alignments.columnCenter,
  backgroundColor: theme.colorSet.gray800,
  boxShadow: `0 0 0 0.05rem ${theme.colors.text.textDim4} inset`
})