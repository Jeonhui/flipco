import { globalStyle, style, styleVariants } from "@vanilla-extract/css"
import { theme } from "../../theme/theme.css"

export const gradientLink = style({
  cursor: "pointer",
})

globalStyle(`${gradientLink}:not(:disabled) *`, {
  cursor: "pointer",
})

export const linkSizeVariants = styleVariants(
  theme.boxSizes,
  ({ lineHeight, paddingTop, width }) => ({
    height: `calc(${lineHeight} + ${paddingTop} + ${paddingTop})`,
    width: width ? width : "auto",
    aspectRatio: width ? "auto" : "1",
  }),
)

export const gradientIcon = style({
  width: "100%",
  height: "100%",
  transition: "background-position 1s ease-in-out",
  backgroundSize: "200% 200%",
})

export const gradientIconInvisible = style({
  backgroundPosition: "100% 50%",
})

export const gradientIconVisible = style({
  backgroundPosition: "0% 0%",
})

globalStyle(`${gradientLink}:hover > ${gradientIcon}`, {
  backgroundPosition: "100% 50%",
})
