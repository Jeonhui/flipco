import { Property } from "csstype"

type FontSize = Property.FontSize
type LineHeight = Property.LineHeight
type FontWeight = Property.FontWeight

type FontWeightKey =
  | "lighter"
  | "bolder"
  | "thin"
  | "extraLight"
  | "light"
  | "normal"
  | "medium"
  | "semiBold"
  | "bold"
  | "extraBold"
  | "black"

const fontWeights: { [key in FontWeightKey]: FontWeight } = {
  lighter: "lighter",
  bolder: "bolder",
  thin: "100",
  extraLight: "200",
  light: "300",
  normal: "400",
  medium: "500",
  semiBold: "600",
  bold: "700",
  extraBold: "800",
  black: "900",
}

type TypographyBase = {
  fontSize: FontSize
  lineHeight: LineHeight
}

type MediaQuery = Record<`@media screen and (${string})`, TypographyBase>

type Typography = {
  fontWeight?: FontWeight
} & TypographyBase &
  MediaQuery

type BaseTypographyMap<T extends string, R extends number> = {
  [key in `${T}${R}`]: Typography
}

type TypographyMap<
  T extends BaseTypographyMap<string, number>,
  W extends FontWeightKey = "normal",
> = {
  [key in `${Extract<keyof T, string>}${W extends "normal" ? "" : `_${W}`}`]: Typography
}

type BaseDisplay = BaseTypographyMap<"display", 1 | 2 | 3 | 4 | 5 | 6>
type Display = TypographyMap<BaseDisplay, "bold">

type BaseHeader = BaseTypographyMap<"header", 1 | 2 | 3 | 4 | 5 | 6>
type Header = TypographyMap<BaseHeader, "bold" | "normal">

type BaseBody = BaseTypographyMap<
  "body",
  1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
>
type Body = TypographyMap<BaseBody, "normal">

type BaseButton = BaseTypographyMap<"button", 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8>
type Button = TypographyMap<BaseButton, "medium">

type BaseLabel = BaseTypographyMap<"label", 1 | 2 | 3 | 4>
type Label = TypographyMap<BaseLabel, "medium">

type Typographies = Display & Header & Body & Button & Label

const createTypography = <
  B extends BaseTypographyMap<string, number>,
  O extends TypographyMap<B, never>,
>(
  base: B,
  weights: FontWeight[],
): O => {
  const result = {} as O
  Object.keys(base).forEach((baseKey) => {
    weights.forEach((weight) => {
      const key =
        `${baseKey}${weight === "normal" ? "" : `_${weight}`}` as keyof O
      const baseValue = base[baseKey as keyof B] as Typography
      const typography: Typography = {
        ...baseValue,
        fontWeight: fontWeights[weight as keyof typeof fontWeights],
      }
      result[key] = typography as unknown as O[keyof O]
    })
  })
  return result
}

const textBreakpointMedia = "@media screen and (max-width: 768px)"

const display: Display = createTypography<BaseDisplay, Display>(
  {
    display1: {
      fontSize: "4rem",
      lineHeight: "5rem",
      [textBreakpointMedia]: {
        fontSize: "3.5rem",
        lineHeight: "4.5rem",
      },
    },
    display2: {
      fontSize: "3.5rem",
      lineHeight: "4.5rem",
      [textBreakpointMedia]: {
        fontSize: "3rem",
        lineHeight: "4rem",
      },
    },
    display3: {
      fontSize: "3rem",
      lineHeight: "4rem",
      [textBreakpointMedia]: {
        fontSize: "2.5rem",
        lineHeight: "3rem",
      },
    },
    display4: {
      fontSize: "2.5rem",
      lineHeight: "3rem",
      [textBreakpointMedia]: {
        fontSize: "2.25rem",
        lineHeight: "2.75rem",
      },
    },
    display5: {
      fontSize: "2.25rem",
      lineHeight: "2.75rem",
      [textBreakpointMedia]: {
        fontSize: "2rem",
        lineHeight: "2.5rem",
      },
    },
    display6: {
      fontSize: "2rem",
      lineHeight: "2.5rem",
      [textBreakpointMedia]: {
        fontSize: "1.75rem",
        lineHeight: "2.25rem",
      },
    },
  },
  ["bold"],
)

const header: Header = createTypography<BaseHeader, Header>(
  {
    header1: {
      fontSize: "3rem",
      lineHeight: "3.5rem",
      [textBreakpointMedia]: {
        fontSize: "2.5rem",
        lineHeight: "3rem",
      },
    },
    header2: {
      fontSize: "2.5rem",
      lineHeight: "3rem",
      [textBreakpointMedia]: {
        fontSize: "2rem",
        lineHeight: "2.5rem",
      },
    },
    header3: {
      fontSize: "2rem",
      lineHeight: "2.5rem",
      [textBreakpointMedia]: {
        fontSize: "1.75rem",
        lineHeight: "2.25rem",
      },
    },
    header4: {
      fontSize: "1.75rem",
      lineHeight: "2.25rem",
      [textBreakpointMedia]: {
        fontSize: "1.5rem",
        lineHeight: "2rem",
      },
    },
    header5: {
      fontSize: "1.5rem",
      lineHeight: "2rem",
      [textBreakpointMedia]: {
        fontSize: "1rem",
        lineHeight: "1.5rem",
      },
    },
    header6: {
      fontSize: "1.25rem",
      lineHeight: "1.75rem",
      [textBreakpointMedia]: {
        fontSize: "1.125rem",
        lineHeight: "1.5rem",
      },
    },
  },
  ["bold", "normal"],
)

const body: Body = createTypography<BaseBody, Body>(
  {
    body1: {
      fontSize: "1.25rem",
      lineHeight: "1.75rem",
      [textBreakpointMedia]: {
        fontSize: "1.125rem",
        lineHeight: "1.5rem",
      },
    },
    body2: {
      fontSize: "1.125rem",
      lineHeight: "1.5rem",
      [textBreakpointMedia]: {
        fontSize: "1rem",
        lineHeight: "1.6rem",
      },
    },
    body3: {
      fontSize: "1rem",
      lineHeight: "1.6rem",
      [textBreakpointMedia]: {
        fontSize: "0.875rem",
        lineHeight: "1.25rem",
      },
    },
    body4: { fontSize: "0.875rem", lineHeight: "1.25rem" },
    body5: { fontSize: "0.75rem", lineHeight: "1rem" },
    body6: { fontSize: "0.625rem", lineHeight: "0.875rem" },
    body7: { fontSize: "0.5rem", lineHeight: "0.75rem" },
    body8: { fontSize: "0.375rem", lineHeight: "0.625rem" },
    body9: { fontSize: "0.25rem", lineHeight: "0.375rem" },
    body10: { fontSize: "0.125rem", lineHeight: "0.25rem" },
  },
  ["normal"],
)

const button: Button = createTypography<BaseButton, Button>(
  {
    button1: { fontSize: "2rem", lineHeight: "2.5rem" },
    button2: { fontSize: "1.5rem", lineHeight: "2rem" },
    button3: { fontSize: "1rem", lineHeight: "1.5rem" },
    button4: { fontSize: "1.25rem", lineHeight: "1.75rem" },
    button5: { fontSize: "1.125rem", lineHeight: "1.5rem" },
    button6: { fontSize: "1rem", lineHeight: "1.6rem" },
    button7: { fontSize: "0.875rem", lineHeight: "1.25rem" },
    button8: { fontSize: "0.75rem", lineHeight: "1rem" },
  },
  ["medium"],
)

const label: Label = createTypography<BaseLabel, Label>(
  {
    label1: { fontSize: "1rem", lineHeight: "1.25rem" },
    label2: { fontSize: "0.875rem", lineHeight: "1.125rem" },
    label3: { fontSize: "0.75rem", lineHeight: "1rem" },
    label4: { fontSize: "0.625rem", lineHeight: "0.875rem" },
  },
  ["medium"],
)

const typographies: Typographies = {
  ...display,
  ...header,
  ...body,
  ...button,
  ...label,
}

export default typographies
