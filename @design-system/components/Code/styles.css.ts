import { style, styleVariants } from "@vanilla-extract/css"
import { theme } from "../../theme/theme.css"

export const code = style({
  ...theme.alignments.rowTopCenter,
  fontFamily: theme.fonts.code,
  color: theme.colors.primary,
})

export const codeSizeVariants = styleVariants(theme.boxSizes, (size) => ({
  ...size,
}))
