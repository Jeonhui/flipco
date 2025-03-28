import { Property } from "csstype"

type Space = Property.Gap & Property.Padding & Property.Margin

type Spaces = {
  none: Space
  xxSmall: Space
  xSmall: Space
  small: Space
  medium: Space
  large: Space
  xLarge: Space
  xxLarge: Space
  xxxLarge: Space
}

const spaces: Spaces = {
  none: "0",
  xxSmall: "0.125rem", // 2px
  xSmall: "0.25rem", // 4px
  small: "0.5rem", // 8px
  medium: "1rem", // 16px
  large: "1.5rem", // 24px
  xLarge: "2rem", // 32px
  xxLarge: "3rem", // 48px
  xxxLarge: "4rem", // 64px
}

export default spaces
