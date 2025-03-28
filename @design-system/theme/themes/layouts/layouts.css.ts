import { CSSProperties } from "@vanilla-extract/css"

type Layout = Pick<CSSProperties, "width" | "height">

type Layouts = {
  fullParent: Layout
  fullWidth: Layout
  fullHeight: Layout
  fullScreen: Layout
}

const layouts: Layouts = {
  fullParent: {
    width: "100%",
    height: "100%",
  },
  fullWidth: {
    width: "100%",
  },
  fullHeight: {
    height: "100%",
  },
  fullScreen: {
    width: "100svw",
    height: "100svh",
  },
}

export default layouts
