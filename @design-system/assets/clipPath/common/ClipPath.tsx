import { PropsWithChildren } from "react"

type ClipPathProps = PropsWithChildren<{
  clipPathId: string
  viewBox?: string
}>

const ClipPath = ({
  children,
  clipPathId,
  viewBox,
  ...props
}: ClipPathProps) => {
  return (
    <svg viewBox={viewBox} width={"0"} height={"0"} {...props}>
      <defs>
        <clipPath id={clipPathId} clipPathUnits="objectBoundingBox">
          {children}
        </clipPath>
      </defs>
    </svg>
  )
}

export default ClipPath
export type { ClipPathProps }
