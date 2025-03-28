import { globalStyle, style, styleVariants } from "@vanilla-extract/css"
import { theme } from "../../theme/theme.css"

export const list = style({
  listStyle: "none",
  padding: 0,
  margin: 0,
})

globalStyle(`${list} > li`, {
  padding: "0.1rem 0",
})

export const listAlignmentVariants = styleVariants(
  theme.alignments,
  (alignment) => alignment,
)

export const listGapVariants = styleVariants(theme.spaces, (space) =>
  space === "0"
    ? {}
    : {
        gap: space,
      },
)

export const listVerticalPaddingVariants = styleVariants(
  theme.spaces,
  (space) =>
    space === "0"
      ? {}
      : {
          "&[data-has-header-padding=true]": {
            paddingTop: `calc(${space} + 3rem)`,
          },
          paddingTop: `${space}`,
          paddingBottom: space,
        },
)

export const listHorizontalPaddingVariants = styleVariants(
  theme.spaces,
  (space) =>
    space === "0"
      ? {}
      : {
          paddingLeft: space,
          paddingRight: space,
        },
)
