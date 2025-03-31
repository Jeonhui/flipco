import { style } from "@vanilla-extract/css"
import { Color } from "@design-system/theme/themes/colors/colorSetVars.css"
import { theme } from "@design-system/theme/theme.css"

const withAlpha = (color: Color, alpha: number): string => {
  return `rgb(from ${color} r g b / ${alpha})`
}

export const youtubeInputContainer = style({
  marginTop: theme.spaces.small,
  alignSelf: "center",
  borderRadius: theme.spaces.small,
  padding: `${theme.spaces.medium} ${theme.spaces.small} ${theme.spaces.medium} ${theme.spaces.medium}`,
  backgroundColor: withAlpha(theme.colorSet.gray400, 0.4),
  width: "90%",
  height: "2rem"
})

export const youtubeInput = style({
  flexGrow: 1,
  backgroundColor: "transparent",
  border: "none",
  outline: "none",
  color: theme.colors.text.textDim,
  selectors: {
    "&::placeholder": {
      color: theme.colors.text.textDim2
    },
  }
})