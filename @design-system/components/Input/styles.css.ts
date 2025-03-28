import { globalStyle, style, styleVariants } from "@vanilla-extract/css"
import { theme } from "../../theme/theme.css"

export const input = style({
  ...theme.alignments.rowCenterLeft,
})

globalStyle(`${input} > input`, {
  flexGrow: 1,
  backgroundColor: "transparent",
  border: "none",
  outline: "none",
})

export const inputColorVariants = styleVariants(
  theme.colors.input,
  (color) => ({
    backgroundColor: color.default.background,
    ...(color.default.border && {
      boxShadow: `0 0 0 0.1rem ${color.default.border} inset`,
    }),
    "> input": {
      color: color.default.text,
    },
    "> input::placeholder": {
      color: color.default.placeholder,
    },
    "> svg": {
      fill: color.default.icon,
    },

    "&[data-disabled=true]": {
      backgroundColor: color.disabled.background,
      "> input": {
        color: color.disabled.text,
      },
      "> input::placeholder": {
        color: color.disabled.placeholder,
      },
      "> svg": {
        fill: color.disabled.icon,
      },
    },
  }),
)

export const inputSizeVariants = styleVariants(
  theme.boxSizes,
  ({ fontSize, fontWeight, lineHeight, ...size }) => ({
    ...size,
    "> input": {
      fontSize: fontSize,
      fontWeight: fontWeight,
      lineHeight: lineHeight,
    },
    "> svg": {
      height: lineHeight,
    },
  }),
)
