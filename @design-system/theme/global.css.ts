import { globalStyle } from "@vanilla-extract/css"
import { theme } from "./theme.css"

globalStyle("*", {
  cursor: "default",
  zIndex: theme.zIndices.default,
  margin: 0,
  padding: 0,
  boxSizing: "border-box",
  transition: "color 0.3s ease-in-out, background-color 0.3s ease-in-out",
})

globalStyle("body", {
  position: "relative",
  height: "100svh",
  backgroundColor: theme.colors.background,
  fontFamily: theme.fonts.base,
  color: theme.colors.text.text,
  zIndex: theme.zIndices.base,
})

globalStyle("a", {
  textDecoration: "none",
})

globalStyle("svg", {
  transition: "fill 0.3s ease-in-out",
})
