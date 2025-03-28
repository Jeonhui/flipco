"use client"

import { useEffect, useState } from "react"
import FlipWrapper from "@/components/FlipDateClock/FlipWrapper"
import { useIsClient } from "@design-system/hooks"
import * as styles from "./styles.css"
import { clsx } from "clsx"
import { Container, Text } from "@design-system/components"

type Time = {
  hours: number | string
  minutes: number | string
  seconds: number | string
}

const getOrdinal = (n: number) => {
  const s = ["th", "st", "nd", "rd"]
  const v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}

type FlipDateClockProps = {
  className?: string
}

const FlipDateClock = ({ className }: FlipDateClockProps) => {
  const isClient = useIsClient()

  const [date, setDate] = useState<string | null>(null)
  const [time, setTime] = useState<Time | null>(null)

  useEffect(() => {
    if (!isClient) return
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

    const interval = setInterval(() => {
      const now = new Date()
      const weekday = now.toLocaleDateString("en-US", {
        timeZone: userTimeZone,
        weekday: "long"
      })
      const month = now.toLocaleDateString("en-US", {
        timeZone: userTimeZone,
        month: "long"
      })
      const day = new Intl.DateTimeFormat("en-US", {
        timeZone: userTimeZone,
        day: "numeric"
      }).format(now)
      const year = now.toLocaleDateString("en-US", {
        timeZone: userTimeZone,
        year: "numeric"
      })
      const formatted = `${weekday}, ${month} ${getOrdinal(Number(day))}, ${year}`
      setDate(formatted)

      const [h, m, s] = now
        .toLocaleTimeString("en-US", {
          timeZone: userTimeZone,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false
        })
        .split(":")
      setTime({
        hours: h,
        minutes: m,
        seconds: s
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isClient])

  if (!isClient) {
    return null
  }

  return (
    <Container className={clsx(styles.flipDateClockContainer, className,
      {
        [styles.flipDateClockContainerInvisible]: !(date && time),
        [styles.flipDateClockContainerVisible]: date && time
      })}>
      <Text className={clsx(styles.flipDate)} color={"textDim"}>{date}</Text>
      <div className={clsx(styles.flipClockContainer)}>
        <FlipWrapper className={clsx(styles.flipClock)} value={time?.hours} />
        <Text className={clsx(styles.flipClockSeparator, styles.flipClockMediaSmall)} typography={"header2"}
              color={"textDim2"}>:</Text>
        <FlipWrapper className={clsx(styles.flipClock)} value={time?.minutes} />
        <Text className={clsx(styles.flipClockSeparator, styles.flipClockMedia)} typography={"header2"}
              color={"textDim2"}>:</Text>
        <FlipWrapper className={clsx(styles.flipClock, styles.flipClockMedia)} value={time?.seconds} />
      </div>
    </Container>
  )
}

export default FlipDateClock