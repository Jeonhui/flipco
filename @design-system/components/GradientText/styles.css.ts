import { globalStyle, style, styleVariants } from "@vanilla-extract/css"
import { theme } from "../../theme/theme.css"

export const gradientText = style({
  backgroundClip: "text !important",
  color: "transparent",
  transition: "background-position 1s ease-in-out",
  backgroundSize: "200% 200%",
})

export const gradientTextInvisible = style({
  backgroundPosition: "100% 50%",
})

export const gradientTextVisible = style({
  backgroundPosition: "0% 0%",
})

export const gradientTextEffect = style({
  backgroundPosition: "100% 50%",
})

globalStyle(`${gradientText} > strong`, {
  fontWeight: "bold",
})

export const gradientTextFontVariants = styleVariants(theme.fonts, (font) => ({
  fontFamily: font,
}))

export const gradientTextTypographyVariants = styleVariants(
  theme.typographies,
  (typography) => ({
    ...typography,
  }),
)
