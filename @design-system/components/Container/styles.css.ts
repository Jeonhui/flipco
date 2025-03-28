import { style, styleVariants } from "@vanilla-extract/css"
import { theme } from "../../theme/theme.css"

export const container = style({})

export const box = style({})

export const flexGrow = style({
  flexGrow: 1,
})

export const containerLayoutVariants = styleVariants(
  theme.layouts,
  (layout) => layout,
)

export const containerAlignmentVariants = styleVariants(
  theme.alignments,
  (alignment) => alignment,
)

export const containerPaddingVariants = styleVariants(theme.spaces, (space) =>
  space === "0"
    ? {}
    : {
        padding: space,
      },
)

export const containerGapVariants = styleVariants(theme.spaces, (space) =>
  space === "0"
    ? {}
    : {
        gap: space,
      },
)
