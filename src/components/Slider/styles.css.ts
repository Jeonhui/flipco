import { style } from "@vanilla-extract/css"
import { theme } from "@design-system/theme/theme.css"

export const slider = style({
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
