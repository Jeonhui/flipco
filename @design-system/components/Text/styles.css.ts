import {
  globalStyle,
  keyframes,
  style,
  styleVariants,
} from "@vanilla-extract/css"
import { theme } from "../../theme/theme.css"

export const text = style({
  maxWidth: "100%",
  borderRadius: `${theme.spaces.xxSmall}`,
})

globalStyle(`${text} > strong`, {
  fontWeight: "bold",
})

const colors = {
  ...theme.colors.text,
  inherit: undefined,
}

export const textColorVariants = styleVariants(colors, (textColor) =>
  textColor
    ? {
        color: textColor,
      }
    : {},
)

export const textFontVariants = styleVariants(theme.fonts, (font) => ({
  fontFamily: font,
}))

const textBreakpointMedia = "screen and (max-width: 768px)"

export const textTypographyVariants = styleVariants(
  theme.typographies,
  (typography) => ({
    ...typography,
    minHeight: typography.lineHeight,
    "@media": {
      ...(typography[`@media ${textBreakpointMedia}`]
        ? {
            [textBreakpointMedia]: {
              ...typography[`@media ${textBreakpointMedia}`],
              minHeight: typography[`@media ${textBreakpointMedia}`].lineHeight,
            },
          }
        : {}),
    },
  }),
)

const gradientAnimation = keyframes({
  "0%": {
    backgroundPosition: "0 0",
  },
  "100%": {
    backgroundPosition: "200% 0",
  },
})

export const skeleton = style({
  background: `linear-gradient(120deg, ${theme.colors.text.textDim3} 0%, ${theme.colors.text.textDim4} 50%, ${theme.colors.text.textDim3} 100%)`,
  backgroundSize: "200% 100%",
  animation: `${gradientAnimation} 4s infinite`,
})
