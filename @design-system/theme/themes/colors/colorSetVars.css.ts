import { Property } from "csstype"
import { createGlobalTheme } from "@vanilla-extract/css"

type Color = Property.Color

type ColorRange = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900

type ColorMap<T extends string> = {
  [key in `${T}${ColorRange}`]: Color
}

type PrimaryBlue = ColorMap<"primary">
type Gray = ColorMap<"gray"> & { black: Color; white: Color }
type SystemRed = ColorMap<"systemRed">
type SystemYellow = ColorMap<"systemYellow">
type SystemGreen = ColorMap<"systemGreen">

type ColorSet = PrimaryBlue & Gray & SystemRed & SystemYellow & SystemGreen

/*
const primaryBlue: PrimaryBlue = {
  primary900: "#0a2540",
  primary800: "#0f3d5e",
  primary700: "#155d85",
  primary600: "#1b7bb1",
  primary500: "#209cee",
  primary400: "#52b8ff",
  primary300: "#7fccff",
  primary200: "#a6e0ff",
  primary100: "#ccecff",
  primary50: "#e6f7ff",
}

const gray: Gray = {
  black: "#000000",
  white: "#ffffff",
  gray900: "#1a1a1a",
  gray800: "#333333",
  gray700: "#4d4d4d",
  gray600: "#666666",
  gray500: "#808080",
  gray400: "#999999",
  gray300: "#b3b3b3",
  gray200: "#cccccc",
  gray100: "#e6e6e6",
  gray50: "#f2f2f2",
}

const systemRed: SystemRed = {
  systemRed900: "#7f1d1d",
  systemRed800: "#991b1b",
  systemRed700: "#b91c1c",
  systemRed600: "#dc2626",
  systemRed500: "#ef4444",
  systemRed400: "#f87171",
  systemRed300: "#fca5a5",
  systemRed200: "#fecaca",
  systemRed100: "#fee2e2",
  systemRed50: "#fef2f2",
}

const systemYellow: SystemYellow = {
  systemYellow900: "#78350f",
  systemYellow800: "#92400e",
  systemYellow700: "#b45309",
  systemYellow600: "#d97706",
  systemYellow500: "#f59e0b",
  systemYellow400: "#fbbf24",
  systemYellow300: "#fcd34d",
  systemYellow200: "#fde68a",
  systemYellow100: "#fef3c7",
  systemYellow50: "#fffbeb",
}

const systemGreen: SystemGreen = {
  systemGreen900: "#064e3b",
  systemGreen800: "#065f46",
  systemGreen700: "#047857",
  systemGreen600: "#059669",
  systemGreen500: "#10b981",
  systemGreen400: "#34d399",
  systemGreen300: "#6ee7b7",
  systemGreen200: "#a7f3d0",
  systemGreen100: "#d1fae5",
  systemGreen50: "#ecfdf5",
}
*/

const primaryBlue: PrimaryBlue = {
  primary900: "#1E0B4E",
  primary800: "#182170",
  primary700: "#123791",
  primary600: "#0C4DB2",
  primary500: "#0763D3",
  primary400: "#017AF5",
  primary300: "#3494F7",
  primary200: "#67AFF9",
  primary100: "#9ACAFB",
  primary50: "#CCE5FD",
}

const gray: Gray = {
  black: "#000000",
  white: "#FFFFFF",
  gray900: "#242426",
  gray800: "#3A3A3C",
  gray700: "#505051",
  gray600: "#666667",
  gray500: "#7C7C7D",
  gray400: "#929293",
  gray300: "#A8A8A8",
  gray200: "#BDBDBE",
  gray100: "#D4D4D4",
  gray50: "#EAEAEA",
}

const systemRed: SystemRed = {
  systemRed900: "#911124",
  systemRed800: "#91282C",
  systemRed700: "#A92B35",
  systemRed600: "#C12D3D",
  systemRed500: "#D82F45",
  systemRed400: "#F0324E",
  systemRed300: "#F35B71",
  systemRed200: "#F68495",
  systemRed100: "#F9ADB8",
  systemRed50: "#FCD6DC",
}

const systemYellow: SystemYellow = {
  systemYellow900: "#E5A501",
  systemYellow800: "#EAAB12",
  systemYellow700: "#EFB224",
  systemYellow600: "#F5B836",
  systemYellow500: "#FABF47",
  systemYellow400: "#FFC659",
  systemYellow300: "#FFD17A",
  systemYellow200: "#FFDD9B",
  systemYellow100: "#FFE8BD",
  systemYellow50: "#FFF4DE",
}

const systemGreen: SystemGreen = {
  systemGreen900: "#028928",
  systemGreen800: "#0F9440",
  systemGreen700: "#1C9F58",
  systemGreen600: "#29AB71",
  systemGreen500: "#36B688",
  systemGreen400: "#43C2A1",
  systemGreen300: "#69CEB4",
  systemGreen200: "#8EDAC7",
  systemGreen100: "#B4E7DA",
  systemGreen50: "#DAF3ED",
}

const colorSet: ColorSet = {
  ...primaryBlue,
  ...gray,
  ...systemRed,
  ...systemYellow,
  ...systemGreen,
}

const colorSetVars = createGlobalTheme(":root", colorSet)

export type { Color }
export default colorSetVars
