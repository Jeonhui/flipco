import { globalStyle, style, styleVariants } from "@vanilla-extract/css"
import { theme } from "../../theme/theme.css"

export const link = style({
  cursor: "pointer",
  textWrap: "nowrap",
  ":disabled": {
    cursor: "default",
  },
  border: "none",
})

globalStyle(`${link}:not(:disabled) *`, {
  cursor: "pointer",
})

export const linkAlignmentVariants = styleVariants(
  theme.alignments,
  (alignment) => ({
    ...alignment,
  }),
)

export const linkSizeVariants = styleVariants(theme.boxSizes, (size) => ({
  ...size,
  " svg": {
    height: size.lineHeight,
  },
}))

export const linkColorVariants = styleVariants(
  {
    ...theme.colors.button,
    none: {
      default: {
        icon: theme.colors.logo,
        text: theme.colors.text.text,
        background: "transparent",
        border: "transparent",
      },
      hover: {
        icon: theme.colors.primary,
        text: theme.colors.text.textHighlight,
        background: "transparent",
        border: "transparent",
      },
      pressed: {
        icon: "currentColor",
        text: "currentColor",
        background: "transparent",
        border: "transparent",
      },
      disabled: {
        icon: "currentColor",
        text: "currentColor",
        background: "transparent",
        border: "transparent",
      },
    },
  },
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
