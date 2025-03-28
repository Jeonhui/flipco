import { style, styleVariants } from "@vanilla-extract/css"
import { theme } from "../../theme/theme.css"

export const divider = style({})

export const dividerThicknessVariants = styleVariants(
  theme.spaces,
  (textColor) => {
    return {
      width: textColor,
      height: textColor,
    }
  },
)

export const dividerColorVariants = styleVariants(
  theme.colors.text,
  (textColor) => ({
    color: textColor,
  }),
)

export const dividerHorizontal = style({
  width: "100% !important",
})

export const dividerVertical = style({
  height: "100% !important",
})
