import { globalStyle, style, styleVariants } from "@vanilla-extract/css"
import { theme } from "../../theme/theme.css"

export const button = style({
  cursor: "pointer",
  textWrap: "nowrap",
  ":disabled": {
    cursor: "default",
  },
  border: "none",
})

globalStyle(`${button}:not(:disabled) *`, {
  cursor: "pointer",
})

export const buttonAlignmentVariants = styleVariants(
  theme.alignments,
  (alignment) => ({
    ...alignment,
  }),
)

export const buttonSizeVariants = styleVariants(theme.boxSizes, (size) => ({
  ...size,
  " svg": {
    height: size.lineHeight,
  },
}))

export const buttonColorVariants = styleVariants(
  theme.colors.button,
  (color) => ({
    fill: color.default.icon,
    color: color.default.text,
    backgroundColor: color.default.background,
    ...(color.default.border && {
      boxShadow: `0 0 0 0.1rem ${color.default.border} inset`,
    }),
    ":hover": {
      fill: color.hover.icon,
      color: color.hover.text,
      backgroundColor: color.hover.background,
      ...(color.hover.border && {
        boxShadow: `0 0 0 0.1rem ${color.hover.border} inset`,
      }),
    },
    ":active": {
      fill: color.pressed.icon,
      color: color.pressed.text,
      backgroundColor: color.pressed.background,
      ...(color.pressed.border && {
        boxShadow: `0 0 0 0.1rem ${color.pressed.border} inset`,
      }),
    },
    ":disabled": {
      fill: color.disabled.icon,
      color: color.disabled.text,
      backgroundColor: color.disabled.background,
      ...(color.disabled.border && {
        boxShadow: `0 0 0 0.1rem ${color.disabled.border} inset`,
      }),
    },
  }),
)
