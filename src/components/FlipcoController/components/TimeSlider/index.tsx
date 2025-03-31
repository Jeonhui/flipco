"use client"

import clsx from "clsx"
import * as styles from "./styles.css"
import React, { useEffect } from "react"
import { Container } from "@design-system/components"

type SliderProps = {
  className?: string
  min?: number
  max?: number
  value: number
  isSliding?: boolean
  onChange?: (value: number) => void
  setIsSliding?: (isSliding: boolean) => void
  onSlidingEnd?: (value: number) => void
}

const Slider = ({
                  className,
                  min = 0,
                  max = 100,
                  value,
                  onChange,
                  isSliding,
                  setIsSliding,
                  onSlidingEnd
                }: SliderProps) => {
  const [percent, setPercent] = React.useState(((value - min) / (max - min)) * 100)

  const handleMouseDown = () => {
    if (!isSliding) {
      setIsSliding?.(true)
    }
  }

  const handleMouseUp = () => {
    if (isSliding) {
      setIsSliding?.(false)
      onSlidingEnd?.(value)
    }
  }
  const handleMouseLeave = () => {
    if (isSliding) {
      setIsSliding?.(false)
      onSlidingEnd?.(value)
    }
  }

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(Number(e.target.value))
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeHandler(e)
  }

  useEffect(() => {
    setPercent(((value - min) / (max - min)) * 100)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <Container className={clsx(styles.sliderContainer)} alignment={"rowTopLeft"} layout={"fullWidth"}>
    <div className={clsx(styles.track)} />
    <div className={clsx(styles.percent)} style={{ width: `${percent}%` }} />
    <input
      className={clsx(className,
        styles.slider)}
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={handleInput}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
    </input>
  </Container>
}

export default Slider