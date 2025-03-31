import { style } from "@vanilla-extract/css"
import { theme } from "@design-system/theme/theme.css"

const trackHeight = "0.26rem"
const thumbSize = "0.6rem"
const mobileThumbSize = "1rem"

export const slider = style({
  WebkitAppearance: "none",

  background: "transparent",
  borderRadius: "0.4rem",
  outline: "none",
  transition: "background 0.2s",

  selectors: {
    "&:hover": {
      background: theme.colorSet.gray300
    },
    "&::-webkit-slider-runnable-track": {
      width: "100%",
      height: trackHeight,
      background: `linear-gradient(to right, transparent 0%, ${theme.colorSet.gray50} 100%)`,
      borderRadius: `calc(${trackHeight} / 2)`,
    },
    "&::-webkit-slider-thumb": {
      WebkitAppearance: "none",
      width: thumbSize,
      aspectRatio: "1",
      marginTop: `calc(${trackHeight} / 2)`,
      transform: "translateY(-50%)",
      background: theme.colorSet.gray200,
      borderRadius: "50%",
      cursor: "pointer",
      transition: "background 0.2s",

      "@media": {
        "screen and (max-width: 480px)": {
          width: mobileThumbSize,
        }
      },
    },
    "&::-webkit-slider-thumb:hover": {
      background: theme.colorSet.gray300,
      boxShadow: `0 0 0 0.025rem ${theme.colorSet.gray500} inset`
    },

    // Firefox
    "&::-moz-range-track": {
      width: "100%",
      height: trackHeight,
      background: `linear-gradient(to right, transparent 0%, ${theme.colorSet.gray50} 100%)`,
      borderRadius: `calc(${trackHeight} / 2)`,
      padding: "0.02rem"
    },
    "&::-moz-range-thumb": {
      WebkitAppearance: "none",
      width: thumbSize,
      aspectRatio: "1",
      marginTop: "-0.25rem",
      background: theme.colorSet.gray200,
      borderRadius: "50%",
      cursor: "pointer",
      transition: "background 0.2s",
      "@media": {
        "screen and (max-width: 480px)": {
          width: mobileThumbSize,
        }
      },
    },
    "&::-moz-range-thumb:hover": {
      background: theme.colorSet.gray300,
      boxShadow: `0 0 0 0.025rem ${theme.colorSet.gray500} inset`
    }
  }
})
