import { PropsWithChildren } from "react"
import { clsx } from "clsx"
import * as styles from "./styles.css"
import { Property } from "csstype"

type Width = Property.Width
type Height = Property.Height
type Fill = Property.Fill
type Stroke = Property.Stroke
type StrokeWidth = Property.StrokeWidth

type IconProps = {
  className?: string
  width?: Width
  height?: Height
  fillWidth?: boolean
  fillHeight?: boolean
  aspectRatioOne?: boolean
  fill?: Fill
  stroke?: Stroke
  strokeWidth?: StrokeWidth
}

type IconWithChildrenProps = PropsWithChildren<
  IconProps & {
    viewBox?: string
  }
>

const Icon = ({
  children,
  viewBox,
  className,
  width,
  height,
  fillWidth,
  fillHeight,
  aspectRatioOne,
  fill,
  ...props
}: IconWithChildrenProps) => {
  return (
    <svg
      viewBox={viewBox}
      fill={fill}
      style={{
        width: width,
        height: height,
      }}
      className={clsx(className, {
        [styles.fillWidth]: width === undefined && fillWidth,
        [styles.fillHeight]: height === undefined && fillHeight,
        [styles.aspectRatioOne]: aspectRatioOne,
      })}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {children}
    </svg>
  )
}

export default Icon
export type { IconProps }
