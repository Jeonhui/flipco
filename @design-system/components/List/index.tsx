import React from "react"
import { clsx } from "clsx"
import * as styles from "./styles.css"

type ListValueType = string | number | object | React.ReactNode

type ListProps<T extends ListValueType> = {
  values: Array<T>
  list: (value: T) => React.ReactNode
  keyExtractor?: (value: T) => React.Key

  alignment?: keyof typeof styles.listAlignmentVariants
  gap?: keyof typeof styles.listGapVariants
  verticalPadding?: keyof typeof styles.listVerticalPaddingVariants
  horizontalPadding?: keyof typeof styles.listHorizontalPaddingVariants
}

const List = <T extends ListValueType>({
  values,
  list,
  keyExtractor,
  alignment = "columnTopLeft",
  gap = "xxSmall",
  verticalPadding = "medium",
  horizontalPadding = "none",
  ...props
}: ListProps<T>) => {
  return (
    <ul
      className={clsx(
        styles.list,
        styles.listGapVariants[gap],
        styles.listAlignmentVariants[alignment],
        styles.listVerticalPaddingVariants[verticalPadding],
        styles.listHorizontalPaddingVariants[horizontalPadding],
      )}
      {...props}
    >
      {values.map((item, idx) => (
        <li key={keyExtractor ? keyExtractor(item) : idx}>{list(item)}</li>
      ))}
    </ul>
  )
}

export type { ListProps }
export default List
