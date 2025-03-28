import { CSSProperties } from "@vanilla-extract/css"
import typographies from "../typographies/typographies.css"

type BoxSize = Pick<
  CSSProperties,
  | "width"
  | "paddingTop"
  | "paddingBottom"
  | "paddingLeft"
  | "paddingRight"
  | "gap"
  | "borderRadius"
  | "fontSize"
  | "lineHeight"
  | "fontWeight"
>

type BaseBoxSizes = {
  xxSmall: BoxSize
  xSmall: BoxSize
  small: BoxSize
  medium: BoxSize
  large: BoxSize
  xLarge: BoxSize
  xxLarge: BoxSize
}

type BoxFeature = "full"

type BoxFeatureSizes = {
  [key in `${Extract<keyof BaseBoxSizes, string>}_${BoxFeature}`]: BoxSize
}

type BoxSizes = BaseBoxSizes & BoxFeatureSizes

const baseBoxSizes: BaseBoxSizes = {
  xxSmall: {
    paddingTop: "0.1rem",
    paddingBottom: "0.1rem",
    paddingLeft: "0.4rem",
    paddingRight: "0.4rem",
    borderRadius: "0.24rem",
    gap: "0.2rem",
    ...typographies.button7_medium,
  },
  xSmall: {
    paddingTop: "0.3rem",
    paddingBottom: "0.3rem",
    paddingLeft: "0.6rem",
    paddingRight: "0.6rem",
    borderRadius: "0.24rem",
    gap: "0.2rem",
    ...typographies.button6_medium,
  },
  small: {
    paddingTop: "0.4rem",
    paddingBottom: "0.4rem",
    paddingLeft: "0.7rem",
    paddingRight: "0.7rem",
    borderRadius: "0.28rem",
    gap: "0.2rem",
    ...typographies.button5_medium,
  },
  medium: {
    paddingTop: "0.4rem",
    paddingBottom: "0.4rem",
    paddingLeft: "0.8rem",
    paddingRight: "0.8rem",
    borderRadius: "0.3rem",
    gap: "0.2rem",
    ...typographies.button4_medium,
  },
  large: {
    paddingTop: "0.6rem",
    paddingBottom: "0.6rem",
    paddingLeft: "0.9rem",
    paddingRight: "0.9rem",
    borderRadius: "0.36rem",
    gap: "0.2rem",
    ...typographies.button3_medium,
  },
  xLarge: {
    paddingTop: "0.7rem",
    paddingBottom: "0.7rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    borderRadius: "0.4rem",
    gap: "0.2rem",
    ...typographies.button2_medium,
  },
  xxLarge: {
    paddingTop: "0.8rem",
    paddingBottom: "0.8rem",
    paddingLeft: "1.2rem",
    paddingRight: "1.2rem",
    borderRadius: "0.46rem",
    gap: "0.2rem",
    ...typographies.button1_medium,
  },
}

const boxSizes: BoxSizes = {
  ...baseBoxSizes,
  xxSmall_full: {
    ...baseBoxSizes.xxSmall,
    width: "100%",
  },
  xSmall_full: {
    ...baseBoxSizes.xSmall,
    width: "100%",
  },
  small_full: {
    ...baseBoxSizes.small,
    width: "100%",
  },
  medium_full: {
    ...baseBoxSizes.medium,
    width: "100%",
  },
  large_full: {
    ...baseBoxSizes.large,
    width: "100%",
  },
  xLarge_full: {
    ...baseBoxSizes.xLarge,
    width: "100%",
  },
  xxLarge_full: {
    ...baseBoxSizes.xxLarge,
    width: "100%",
  },
}

export default boxSizes
