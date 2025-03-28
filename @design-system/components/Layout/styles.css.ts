import { globalStyle, style, styleVariants } from "@vanilla-extract/css"
import { theme } from "../../theme/theme.css"

export const sidebarBreakpoint = theme.breakpoints.xLarge
export const layoutContentBreakpoint = theme.breakpoints.medium
export const headerHeight = "4rem"

export const layout = style({
  width: "100%",
  height: "100svh",
  overflowY: "auto",
  scrollBehavior: "smooth",
  ...theme.alignments.rowTopCenter,
})

globalStyle(`${layout}[data-scroll-snap-mandatory=true]`, {
  scrollSnapType: "y mandatory",
})

export const layoutBackground = style({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: theme.zIndices.background,
})

export const layoutContent = style({
  width: "100%",
  minHeight: "100%",
  flexShrink: 0,
})

export const layoutContentMaxWidth = style({
  maxWidth: layoutContentBreakpoint.width,
})


export const layoutContentAlignmentVariants = styleVariants(
  theme.alignments,
  (alignment) => alignment,
)

export const layoutContentGapVariants = styleVariants(
  theme.spaces,
  (space) => ({
    gap: space,
  }),
)

export const forScrollbar = style({
  width: 0,
  height: 0,
  zIndex: theme.zIndices.overlay,
})

export const sidebar = style({
  padding: `${headerHeight} ${theme.spaces.small}`,
  top: 0,
  position: "sticky",
  width: `calc((100% - ${layoutContentBreakpoint.width}) / 2 )`,
  minWidth: "216px",
  height: "100%",
  flexGrow: 1,
  flexShrink: 0,
  "@media": {
    [sidebarBreakpoint.media]: {
      display: "none",
    },
  },
})
