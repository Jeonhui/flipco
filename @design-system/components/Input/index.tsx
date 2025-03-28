"use client"

import React, {
  ChangeEvent,
  forwardRef,
  HTMLInputTypeAttribute,
  Ref,
  useImperativeHandle,
  useRef,
} from "react"
import { clsx } from "clsx"
import * as styles from "./styles.css"

type InputRef = {
  input: HTMLInputElement | null
  container: HTMLDivElement | null
}

type InputProps = {
  leftChildren?: React.ReactNode
  rightChildren?: React.ReactNode
  type?: HTMLInputTypeAttribute
  placeholder?: string
  disabled?: boolean
  color?: keyof typeof styles.inputColorVariants
  size?: keyof typeof styles.inputSizeVariants
  value?: string
  onChange?: (value: string) => void
}

const Input = (
  {
    leftChildren,
    rightChildren,
    type = "text",
    placeholder,
    disabled,
    color = "default",
    size = "medium",
    value,
    onChange,
    ...props
  }: InputProps,
  ref: Ref<InputRef>,
) => {
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value)
  }

  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useImperativeHandle(ref, () => ({
    input: inputRef.current,
    container: containerRef.current,
  }))

  return (
    <div
      ref={containerRef}
      className={clsx(
        styles.input,
        styles.inputColorVariants[color],
        styles.inputSizeVariants[size],
      )}
      data-disabled={disabled}
    >
      {leftChildren}
      <input
        ref={inputRef}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChangeHandler}
        disabled={disabled}
        {...props}
      />
      {rightChildren}
    </div>
  )
}

export type { InputRef, InputProps }
export default forwardRef(Input)
