import React, { forwardRef, Ref } from "react"
import { clsx } from "clsx"
import * as styles from "./styles.css"

type LayoutProps = {
  children: React.ReactNode
  background?: React.ReactNode
  useSideBar?: boolean
  leftSidebar?: React.ReactNode
  rightSidebar?: React.ReactNode
  layoutContentHasMaxWidth?: boolean
  layoutClassName?: string
  layoutContentClassName?: string
  scrollSnapMandatory?: boolean
  alignment?: keyof typeof styles.layoutContentAlignmentVariants
  gap?: keyof typeof styles.layoutContentGapVariants
  onLoad?: () => void
}

const Layout = (
  {
    children,
    background,
    useSideBar = false,
    leftSidebar,
    rightSidebar,
    layoutContentHasMaxWidth = false,
    layoutClassName,
    layoutContentClassName,
    scrollSnapMandatory = false,
    gap = "medium",
    alignment = "columnTopCenter",
    onLoad,
    ...props
  }: LayoutProps,
  ref: Ref<HTMLDivElement>
) => {
  return (
    <div
      onLoad={onLoad}
      ref={ref}
      className={clsx("layout", layoutClassName, styles.layout)}
      {...props}
      data-scroll-snap-mandatory={scrollSnapMandatory}
    >
      <div className={clsx(styles.layoutBackground)}>
        {background}
      </div>
      <div className={clsx(styles.forScrollbar)} />
      {useSideBar && <div className={clsx("leftSideBar", styles.sidebar)}>{leftSidebar}</div>}
      <div
        className={clsx(
          "layoutContent",
          layoutContentClassName,
          styles.layoutContent,
          styles.layoutContentAlignmentVariants[alignment],
          styles.layoutContentGapVariants[gap],
          {
            [styles.layoutContentMaxWidth]: layoutContentHasMaxWidth
          }
        )}
      >
        {children}
      </div>
      {useSideBar && <div className={clsx("rightSideBar", styles.sidebar)}>{rightSidebar}</div>}
    </div>
  )
}

export default forwardRef(Layout)
