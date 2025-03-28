import { globalStyle, style } from "@vanilla-extract/css"
import { theme } from "../../theme/theme.css"

export const loading = style({
  position: "absolute",
  paddingTop: "5rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  left: "50%",
  transform: "translate(-50%,0)",
})

export const loadingContainer = style({
  position: "relative",
  width: "14rem",
  height: "5rem",
  display: "flex",
  justifyContent: "space-around",
})

const dotBreakpointMedia = "screen and (max-width: 768px)"

export const loadingDot = style({
  display: "block",
  width: "1rem",
  height: "1rem",
  borderRadius: "50%",
  background: `linear-gradient(120deg, ${theme.colors.gradient.primaryStart} 0%, ${theme.colors.gradient.end} 100%)`,
  backgroundSize: "14rem 5rem",
  "@media": {
    [dotBreakpointMedia]: {
      width: "0.8rem",
      height: "0.8rem",
    },
  },
})

for (let i = 1; i <= 5; i++) {
  globalStyle(`${loadingContainer} > ${loadingDot}:nth-child(${i})`, {
    vars: { "--index": `${i}` },
  })
}

globalStyle(`${loadingContainer} > *`, {
  vars: {
    "--index": "1",
  },
  backgroundPosition: "calc((14rem / 5) * var(--index) - 1rem)",
})
