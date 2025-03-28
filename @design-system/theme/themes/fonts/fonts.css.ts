import { Property } from "csstype"
import FontFamily = Property.FontFamily

type Fonts = {
  base: FontFamily
  code: FontFamily
}

const fonts: Fonts = {
  base: `var(--font-pretendard), Arial`,
  code: `var(--font-hack)`,
}

export default fonts
