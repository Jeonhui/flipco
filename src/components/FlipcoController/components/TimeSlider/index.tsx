"use client"

import clsx from "clsx"
import * as styles from "./styles.css"
import React from "react"

type SliderProps = {
  className?: string
  min?: number
  max?: number
  value: number
  onChange?: (value: number) => void
}


const Slider = ({
                  className,
                  min,
                  max,
                  value,
                  onChange
                }: SliderProps) => {

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(Number(e.target.value))
  }

  return <input
    className={clsx(className,
      styles.slider)}
    type="range"
    min={min}
    max={max}
    value={value}
    onChange={onChangeHandler}
  />
}

export default Slider