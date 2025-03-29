import { globalStyle, style } from "@vanilla-extract/css"
import { theme } from "@design-system/theme/theme.css"
import { Color } from "@design-system/theme/themes/colors/colorSetVars.css"

const withAlpha = (color: Color, alpha: number): string => {
  return `rgb(from ${color} r g b / ${alpha})`
}

export const flipDateClockContainer = style({
  ...theme.alignments.columnTopLeft,
  gap: theme.spaces.xSmall,
  transition: "opacity 0.3s ease-in-out",
  userSelect: "none",
  padding: theme.spaces.medium,
  backdropFilter: "blur(0.16rem)",
  borderRadius: theme.spaces.medium,
  boxShadow: `0 0 0 0.05rem ${withAlpha(theme.colors.text.textDim4, 0.24)} inset`
})

export const flipDateClockContainerInvisible = style({
  opacity: 0
})

export const flipDateClockContainerVisible = style({
  opacity: 1
})

export const flipDate = style({
  opacity: 0.6,
  ...theme.typographies.header6_bold,
  paddingLeft: theme.spaces.small,
  "@media": {
    [`screen and (max-width: ${theme.breakpoints.small.width})`]: {
      ...theme.typographies.body1,
      fontWeight: "bold"
    },
    [`screen and (max-width: 480px)`]: {
      ...theme.typographies.body3,
      fontWeight: "bold"
    }
  }
})

export const flipClockContainer = style({
  ...theme.alignments.rowCenter,
  gap: theme.spaces.small,
  width: "100%",
  "@media": {
    [`screen and (max-width: 300px)`]: {
      ...theme.alignments.columnCenter,
      gap: theme.spaces.xLarge
    }
  }
})

export const flipClock = style({
  ...theme.typographies.display1_bold,
  "@media": {
    [`screen and (max-width: ${theme.breakpoints.small.width})`]: {
      ...theme.typographies.display2_bold
    },
    [`screen and (max-width: 480px)`]: {
      ...theme.typographies.display1_bold
    }
  }
})

export const flipClockSeparator = style({
  opacity: 0.5
})

export const flipClockMedia = style({
  "@media": {
    [`screen and (max-width: 480px)`]: {
      display: "none"
    }
  }
})

export const flipClockMediaSmall = style({
  "@media": {
    [`screen and (max-width: 300px)`]: {
      display: "none"
    }
  }
})


globalStyle(`${flipClock} *:nth-child(1)`, {
  display: "flex",
  flexWrap: "nowrap"
})

globalStyle(`${flipClock} .tick-credits`, {
  display: "none"
})

globalStyle(`${flipClock} .tick-flip`, {
  opacity: 0.9
})

globalStyle(`${flipClock} .tick-flip-panel`, {
  color: theme.colors.text.text,
  backgroundColor: theme.colors.background
})

globalStyle(`${flipClock} .tick-flip-panel-text-wrapper`, {
  display: "flex",
  justifyContent: "center"
})

globalStyle(`${flipClock} .tick-flip-spacer`, {
  fontVariantNumeric: "tabular-nums"
})