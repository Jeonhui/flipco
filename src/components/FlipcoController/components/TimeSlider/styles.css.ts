import { globalStyle, style } from "@vanilla-extract/css"
import { theme } from "@design-system/theme/theme.css"

const trackHeight = "0.26rem"
const thumbSize = "0.6rem"
const mobileThumbSize = "1rem"

export const slider = style({
  WebkitAppearance: "none",
  width: "100%",
  background: "transparent",
  borderRadius: "0.4rem",
  outline: "none",
  transition: "background 0.2s",
  selectors: {
    "&::-webkit-slider-runnable-track": {
      height: trackHeight,
    },
    "&::-webkit-slider-thumb": {
      zIndex: theme.zIndices.overlay,
      WebkitAppearance: "none",
      width: thumbSize,
      aspectRatio: "1",
      marginTop: `calc(${trackHeight} / 2)`,
      transform: "translateY(-50%)",
      borderRadius: "50%",
      cursor: "pointer",
      transition: "background 0.2s",
      "@media": {
        "screen and (max-width: 480px)": {
          width: mobileThumbSize
        }
      }
    },
    "&::-webkit-slider-thumb:hover": {
      background: theme.colors.primary,
      boxShadow: `0 0 0 0.025rem ${theme.colors.primaryHighlight} inset`
    },
    "&::-moz-range-thumb": {
      zIndex: theme.zIndices.overlay,
      WebkitAppearance: "none",
      width: thumbSize,
      aspectRatio: "1",
      marginTop: `calc(${trackHeight} / 2)`,
      transform: "translateY(-50%)",
      borderRadius: "50%",
      cursor: "pointer",
      transition: "background 0.2s",
      "@media": {
        "screen and (max-width: 480px)": {
          width: mobileThumbSize
        }
      }
    },
    "&::-moz-range-thumb:hover": {
      background: theme.colors.primary,
      boxShadow: `0 0 0 0.025rem ${theme.colors.primaryHighlight} inset`
    }
  }
})

export const sliderContainer = style({
  position: "relative",
  marginTop: "0.2rem",
  padding: "0.1rem 0"
})

globalStyle(`${sliderContainer}:hover input::-webkit-slider-thumb`, {
  background: theme.colors.primary
})

export const track = style({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  width: "100%",
  height: trackHeight,
  backgroundColor: theme.colorSet.gray400,
  opacity: 0.8,
  borderRadius: `calc(${trackHeight} / 2)`,
  padding: "0.02rem"
})

export const percent = style({
  position: "absolute",
  borderRadius: `calc(${trackHeight} / 2)`,
  top: "50%",
  transform: "translateY(-50%)",
  height: trackHeight,
  background: `linear-gradient(to right, ${theme.colors.gradient.end} 0%, ${theme.colors.gradient.start} 100%)`,
  opacity: 0.6
})