import { createTheme, createThemeContract } from "@vanilla-extract/css"
import colorSetVars, { Color } from "./colorSetVars.css"

const withAlpha = (color: Color, alpha: number): string => {
  return `rgb(from ${color} r g b / ${alpha})`
}

type SystemColor = {
  default: Color
  highlight: Color
  highlight2: Color
  dim: Color
  dim2: Color
}

type SystemColorTheme = {
  red: SystemColor
  yellow: SystemColor
  green: SystemColor
}

// Container
type ContainerColorTheme = {
  background: Color
  border: Color
  borderHighlight: Color
  shadow: Color
}

// Text
type TextColor = {
  text: Color
  textHighlight: Color
  textHighlight2: Color
  textHighlight3: Color
  textHighlight4: Color
  textDim: Color
  textDim2: Color
  textDim3: Color
  textDim4: Color
}

// Button
type ButtonType = "default" | "text" | "border" | "grayBorder" | "grayText"
type ButtonState = "default" | "hover" | "pressed" | "disabled"
type ButtonColor = {
  icon: Color
  background?: Color
  border?: Color
  text: Color
}
type ButtonStateColor = { [key in ButtonState]: ButtonColor }
type ButtonTypeColor = { [key in ButtonType]: ButtonStateColor }
type ButtonColorTheme = ButtonTypeColor

// Input
type InputType = "default" | "light" | "border"
type InputState = "default" | "hover" | "focused" | "disabled"
type InputColor = {
  icon: Color
  placeholder: Color
  background: Color
  border: Color
  text: Color
}
type InputStateColor = { [key in InputState]: InputColor }
type InputTypeColor = { [key in InputType]: InputStateColor }
type InputColorTheme = InputTypeColor

type CommandDialogItemState = "default" | "hover" | "selected" | "disabled"
type CommandDialogItemColor = {
  background: Color
  text: Color
}
type CommandDialogItemColorTheme = {
  [key in CommandDialogItemState]: CommandDialogItemColor
}

type GradientColorTheme = {
  primaryStart: Color
  start: Color
  end: Color
}

type CommandDialogColorTheme = {
  overlay: Color
  background: Color
  border: Color
  placeholder: Color
  groupHeadingText: Color
  input: InputColor
  item: CommandDialogItemColorTheme
}

type ColorTheme = {
  primary: Color
  primaryHighlight: Color
  logo: Color
  background: Color
  gradient: GradientColorTheme

  system: SystemColorTheme

  container: ContainerColorTheme

  text: TextColor

  button: ButtonColorTheme

  input: InputColorTheme

  commandDialog: CommandDialogColorTheme
}

// ThemeColors
const lightModeThemeColors: ColorTheme = {
  primary: colorSetVars.primary400,
  primaryHighlight: colorSetVars.primary200,
  logo: colorSetVars.gray900,
  background: colorSetVars.white,

  system: {
    red: {
      default: colorSetVars.systemRed500,
      highlight: colorSetVars.systemRed400,
      highlight2: colorSetVars.systemRed300,
      dim: colorSetVars.systemRed600,
      dim2: colorSetVars.systemRed700,
    },
    yellow: {
      default: colorSetVars.systemYellow500,
      highlight: colorSetVars.systemYellow400,
      highlight2: colorSetVars.systemYellow300,
      dim: colorSetVars.systemYellow600,
      dim2: colorSetVars.systemYellow700,
    },
    green: {
      default: colorSetVars.systemGreen500,
      highlight: colorSetVars.systemGreen400,
      highlight2: colorSetVars.systemGreen300,
      dim: colorSetVars.systemGreen600,
      dim2: colorSetVars.systemGreen700,
    },
  },

  gradient: {
    primaryStart: colorSetVars.primary50,
    start: colorSetVars.gray900,
    end: colorSetVars.primary400,
  },

  container: {
    background: colorSetVars.white,
    border: colorSetVars.gray200,
    borderHighlight: colorSetVars.primary400,
    shadow: colorSetVars.gray300,
  },

  text: {
    text: colorSetVars.gray900,
    textHighlight: colorSetVars.primary300,
    textHighlight2: colorSetVars.primary400,
    textHighlight3: colorSetVars.primary500,
    textHighlight4: colorSetVars.primary600,
    textDim: colorSetVars.gray600,
    textDim2: colorSetVars.gray400,
    textDim3: colorSetVars.gray200,
    textDim4: colorSetVars.gray50,
  },

  button: {
    default: {
      default: {
        icon: colorSetVars.white,
        background: colorSetVars.primary500,
        border: "transparent",
        text: colorSetVars.white,
      },
      hover: {
        icon: colorSetVars.white,
        background: colorSetVars.primary600,
        border: "transparent",
        text: colorSetVars.white,
      },
      pressed: {
        icon: colorSetVars.white,
        background: colorSetVars.primary700,
        border: "transparent",
        text: colorSetVars.white,
      },
      disabled: {
        icon: colorSetVars.gray400,
        background: colorSetVars.gray100,
        border: "transparent",
        text: colorSetVars.gray500,
      },
    },
    text: {
      default: {
        icon: colorSetVars.gray800,
        background: "transparent",
        border: "transparent",
        text: colorSetVars.gray800,
      },
      hover: {
        icon: colorSetVars.gray700,
        background: colorSetVars.gray100,
        border: "transparent",
        text: colorSetVars.gray700,
      },
      pressed: {
        icon: colorSetVars.gray700,
        background: colorSetVars.gray200,
        border: "transparent",
        text: colorSetVars.gray700,
      },
      disabled: {
        icon: colorSetVars.gray400,
        background: colorSetVars.white,
        border: "transparent",
        text: colorSetVars.gray500,
      },
    },
    grayText: {
      default: {
        icon: colorSetVars.gray800,
        background: "transparent",
        border: "transparent",
        text: colorSetVars.gray800,
      },
      hover: {
        icon: colorSetVars.gray700,
        background: colorSetVars.gray100,
        border: "transparent",
        text: colorSetVars.gray700,
      },
      pressed: {
        icon: colorSetVars.gray700,
        background: colorSetVars.gray200,
        border: "transparent",
        text: colorSetVars.gray700,
      },
      disabled: {
        icon: colorSetVars.gray400,
        background: colorSetVars.white,
        border: "transparent",
        text: colorSetVars.gray500,
      },
    },
    border: {
      default: {
        icon: colorSetVars.primary500,
        background: "transparent",
        border: colorSetVars.primary500,
        text: colorSetVars.primary500,
      },
      hover: {
        icon: colorSetVars.primary600,
        background: colorSetVars.white,
        border: colorSetVars.primary600,
        text: colorSetVars.primary600,
      },
      pressed: {
        icon: colorSetVars.primary700,
        background: colorSetVars.white,
        border: colorSetVars.primary700,
        text: colorSetVars.primary700,
      },
      disabled: {
        icon: colorSetVars.gray400,
        background: colorSetVars.white,
        border: colorSetVars.gray200,
        text: colorSetVars.gray500,
      },
    },
    grayBorder: {
      default: {
        icon: colorSetVars.gray700,
        background: "transparent",
        border: colorSetVars.gray50,
        text: colorSetVars.gray700,
      },
      hover: {
        icon: colorSetVars.gray600,
        background: "#F8F8F8",
        border: colorSetVars.gray100,
        text: colorSetVars.gray600,
      },
      pressed: {
        icon: colorSetVars.gray500,
        background: colorSetVars.gray50,
        border: colorSetVars.gray300,
        text: colorSetVars.gray500,
      },
      disabled: {
        icon: colorSetVars.gray400,
        background: colorSetVars.white,
        border: colorSetVars.gray200,
        text: colorSetVars.gray500,
      },
    },
  },

  input: {
    default: {
      default: {
        icon: colorSetVars.gray500,
        placeholder: colorSetVars.gray400,
        background: colorSetVars.white,
        border: colorSetVars.gray300,
        text: colorSetVars.gray900,
      },
      hover: {
        icon: colorSetVars.gray500,
        placeholder: colorSetVars.gray400,
        background: colorSetVars.white,
        border: colorSetVars.primary500,
        text: colorSetVars.gray900,
      },
      focused: {
        icon: colorSetVars.gray500,
        placeholder: colorSetVars.gray400,
        background: colorSetVars.white,
        border: colorSetVars.primary600,
        text: colorSetVars.gray900,
      },
      disabled: {
        icon: colorSetVars.gray300,
        placeholder: colorSetVars.gray200,
        background: colorSetVars.gray100,
        border: colorSetVars.gray200,
        text: colorSetVars.gray500,
      },
    },
    light: {
      default: {
        icon: colorSetVars.primary500,
        placeholder: colorSetVars.primary400,
        background: colorSetVars.white,
        border: colorSetVars.primary400,
        text: colorSetVars.primary500,
      },
      hover: {
        icon: colorSetVars.primary500,
        placeholder: colorSetVars.primary400,
        background: colorSetVars.white,
        border: colorSetVars.primary500,
        text: colorSetVars.primary500,
      },
      focused: {
        icon: colorSetVars.primary500,
        placeholder: colorSetVars.primary400,
        background: colorSetVars.white,
        border: colorSetVars.primary600,
        text: colorSetVars.primary500,
      },
      disabled: {
        icon: colorSetVars.primary300,
        placeholder: colorSetVars.primary200,
        background: colorSetVars.white,
        border: colorSetVars.primary200,
        text: colorSetVars.primary400,
      },
    },
    border: {
      default: {
        icon: colorSetVars.primary500,
        placeholder: colorSetVars.primary400,
        background: colorSetVars.white,
        border: colorSetVars.primary400,
        text: colorSetVars.primary500,
      },
      hover: {
        icon: colorSetVars.primary500,
        placeholder: colorSetVars.primary400,
        background: colorSetVars.white,
        border: colorSetVars.primary500,
        text: colorSetVars.primary500,
      },
      focused: {
        icon: colorSetVars.primary500,
        placeholder: colorSetVars.primary400,
        background: colorSetVars.white,
        border: colorSetVars.primary600,
        text: colorSetVars.primary500,
      },
      disabled: {
        icon: colorSetVars.primary300,
        placeholder: colorSetVars.primary200,
        background: colorSetVars.white,
        border: colorSetVars.primary200,
        text: colorSetVars.primary400,
      },
    },
  },
  commandDialog: {
    overlay: withAlpha(colorSetVars.black, 0.5),
    background: colorSetVars.white,
    border: colorSetVars.gray200,
    input: {
      icon: colorSetVars.gray500,
      placeholder: colorSetVars.gray400,
      background: "transparent",
      border: colorSetVars.gray300,
      text: colorSetVars.gray900,
    },
    placeholder: colorSetVars.gray400,
    groupHeadingText: colorSetVars.gray400,
    item: {
      default: {
        text: colorSetVars.gray900,
        background: "transparent",
      },
      hover: {
        text: colorSetVars.gray900,
        background: colorSetVars.gray100,
      },
      selected: {
        text: colorSetVars.primary500,
        background: colorSetVars.gray100,
      },
      disabled: {
        text: colorSetVars.gray500,
        background: colorSetVars.white,
      },
    },
  },
}

const darkModeThemeColors: ColorTheme = {
  primary: colorSetVars.primary400,
  primaryHighlight: colorSetVars.primary500,
  logo: colorSetVars.gray100,
  background: colorSetVars.gray900,

  gradient: {
    primaryStart: colorSetVars.primary50,
    start: colorSetVars.gray900,
    end: colorSetVars.primary400,
  },

  system: {
    red: {
      default: colorSetVars.systemRed600,
      highlight: colorSetVars.systemRed200,
      highlight2: colorSetVars.systemRed300,
      dim: colorSetVars.systemRed700,
      dim2: colorSetVars.systemRed900,
    },
    yellow: {
      default: colorSetVars.systemYellow600,
      highlight: colorSetVars.systemYellow200,
      highlight2: colorSetVars.systemYellow300,
      dim: colorSetVars.systemYellow700,
      dim2: colorSetVars.systemYellow900,
    },
    green: {
      default: colorSetVars.systemGreen600,
      highlight: colorSetVars.systemGreen200,
      highlight2: colorSetVars.systemGreen300,
      dim: colorSetVars.systemGreen700,
      dim2: colorSetVars.systemGreen900,
    },
  },

  container: {
    background: colorSetVars.gray900,
    border: colorSetVars.gray700,
    borderHighlight: colorSetVars.primary200,
    shadow: colorSetVars.gray800,
  },

  text: {
    text: colorSetVars.gray50,
    textHighlight: colorSetVars.primary300,
    textHighlight2: colorSetVars.primary400,
    textHighlight3: colorSetVars.primary600,
    textHighlight4: colorSetVars.primary700,
    textDim: colorSetVars.gray100,
    textDim2: colorSetVars.gray400,
    textDim3: colorSetVars.gray600,
    textDim4: colorSetVars.gray800,
  },

  button: {
    default: {
      default: {
        icon: colorSetVars.white,
        background: colorSetVars.primary500,
        border: "transparent",
        text: colorSetVars.white,
      },
      hover: {
        icon: colorSetVars.white,
        background: colorSetVars.primary600,
        border: "transparent",
        text: colorSetVars.white,
      },
      pressed: {
        icon: colorSetVars.white,
        background: colorSetVars.primary700,
        border: "transparent",
        text: colorSetVars.white,
      },
      disabled: {
        icon: colorSetVars.gray400,
        background: colorSetVars.gray600,
        border: "transparent",
        text: colorSetVars.gray600,
      },
    },
    text: {
      default: {
        icon: colorSetVars.gray50,
        background: "transparent",
        border: "transparent",
        text: colorSetVars.gray50,
      },
      hover: {
        icon: colorSetVars.gray200,
        background: colorSetVars.gray700,
        border: "transparent",
        text: colorSetVars.gray200,
      },
      pressed: {
        icon: colorSetVars.gray400,
        background: colorSetVars.gray800,
        border: "transparent",
        text: colorSetVars.gray400,
      },
      disabled: {
        icon: colorSetVars.gray400,
        background: colorSetVars.gray700,
        border: "transparent",
        text: colorSetVars.gray500,
      },
    },
    grayText: {
      default: {
        icon: colorSetVars.gray100,
        background: "transparent",
        border: "transparent",
        text: colorSetVars.gray100,
      },
      hover: {
        icon: colorSetVars.gray300,
        background: withAlpha(colorSetVars.gray700, 0.4),
        border: "transparent",
        text: colorSetVars.gray300,
      },
      pressed: {
        icon: colorSetVars.gray700,
        background: withAlpha(colorSetVars.gray800, 0.4),
        border: "transparent",
        text: colorSetVars.gray700,
      },
      disabled: {
        icon: withAlpha(colorSetVars.gray500, 0.4),
        background: "transparent",
        border: "transparent",
        text: colorSetVars.gray500,
      },
    },
    border: {
      default: {
        icon: colorSetVars.primary500,
        background: "transparent",
        border: colorSetVars.primary500,
        text: colorSetVars.primary500,
      },
      hover: {
        icon: colorSetVars.primary400,
        background: colorSetVars.gray900,
        border: colorSetVars.primary400,
        text: colorSetVars.primary400,
      },
      pressed: {
        icon: colorSetVars.primary600,
        background: colorSetVars.gray900,
        border: colorSetVars.primary600,
        text: colorSetVars.primary600,
      },
      disabled: {
        icon: colorSetVars.gray400,
        background: "transparent",
        border: colorSetVars.gray600,
        text: colorSetVars.gray500,
      },
    },
    grayBorder: {
      default: {
        icon: colorSetVars.gray100,
        background: "transparent",
        border: colorSetVars.gray700,
        text: colorSetVars.gray100,
      },
      hover: {
        icon: colorSetVars.gray400,
        background: colorSetVars.gray900,
        border: colorSetVars.gray400,
        text: colorSetVars.gray400,
      },
      pressed: {
        icon: colorSetVars.gray600,
        background: colorSetVars.gray900,
        border: colorSetVars.gray600,
        text: colorSetVars.gray600,
      },
      disabled: {
        icon: colorSetVars.gray400,
        background: "transparent",
        border: colorSetVars.gray600,
        text: colorSetVars.gray500,
      },
    },
  },

  input: {
    default: {
      default: {
        icon: colorSetVars.gray500,
        placeholder: colorSetVars.gray600,
        background: colorSetVars.gray800,
        border: colorSetVars.gray700,
        text: colorSetVars.white,
      },
      hover: {
        icon: colorSetVars.gray500,
        placeholder: colorSetVars.gray600,
        background: colorSetVars.gray800,
        border: colorSetVars.primary500,
        text: colorSetVars.white,
      },
      focused: {
        icon: colorSetVars.gray500,
        placeholder: colorSetVars.gray600,
        background: colorSetVars.gray800,
        border: colorSetVars.primary600,
        text: colorSetVars.white,
      },
      disabled: {
        icon: colorSetVars.gray300,
        placeholder: colorSetVars.gray400,
        background: colorSetVars.gray700,
        border: colorSetVars.gray600,
        text: colorSetVars.gray500,
      },
    },
    light: {
      default: {
        icon: colorSetVars.primary500,
        placeholder: colorSetVars.primary400,
        background: colorSetVars.gray800,
        border: colorSetVars.primary400,
        text: colorSetVars.primary500,
      },
      hover: {
        icon: colorSetVars.primary500,
        placeholder: colorSetVars.primary400,
        background: colorSetVars.gray800,
        border: colorSetVars.primary500,
        text: colorSetVars.primary500,
      },
      focused: {
        icon: colorSetVars.primary500,
        placeholder: colorSetVars.primary400,
        background: colorSetVars.gray800,
        border: colorSetVars.primary600,
        text: colorSetVars.primary500,
      },
      disabled: {
        icon: colorSetVars.primary300,
        placeholder: colorSetVars.primary200,
        background: colorSetVars.gray700,
        border: colorSetVars.primary200,
        text: colorSetVars.primary400,
      },
    },
    border: {
      default: {
        icon: colorSetVars.primary500,
        placeholder: colorSetVars.primary400,
        background: "transparent",
        border: colorSetVars.primary400,
        text: colorSetVars.primary500,
      },
      hover: {
        icon: colorSetVars.primary500,
        placeholder: colorSetVars.primary400,
        background: colorSetVars.gray800,
        border: colorSetVars.primary500,
        text: colorSetVars.primary500,
      },
      focused: {
        icon: colorSetVars.primary500,
        placeholder: colorSetVars.primary400,
        background: colorSetVars.gray800,
        border: colorSetVars.primary600,
        text: colorSetVars.primary500,
      },
      disabled: {
        icon: colorSetVars.primary300,
        placeholder: colorSetVars.primary200,
        background: colorSetVars.gray700,
        border: colorSetVars.primary200,
        text: colorSetVars.primary400,
      },
    },
  },
  commandDialog: {
    overlay: withAlpha(colorSetVars.black, 0.5),
    background: colorSetVars.gray900,
    border: colorSetVars.gray700,
    input: {
      icon: colorSetVars.gray500,
      placeholder: colorSetVars.gray600,
      background: colorSetVars.gray800,
      border: colorSetVars.gray700,
      text: colorSetVars.gray100,
    },
    placeholder: colorSetVars.gray600,
    groupHeadingText: colorSetVars.gray500,
    item: {
      default: {
        text: colorSetVars.gray100,
        background: "transparent",
      },
      hover: {
        text: colorSetVars.gray100,
        background: colorSetVars.gray700,
      },
      selected: {
        text: colorSetVars.gray50,
        background: colorSetVars.gray800,
      },
      disabled: {
        text: colorSetVars.gray500,
        background: colorSetVars.gray900,
      },
    },
  },
}

const colorTheme = createThemeContract(darkModeThemeColors)

const lightModeColorTheme = createTheme(colorTheme, lightModeThemeColors)
const darkModeColorTheme = createTheme(colorTheme, darkModeThemeColors)

export default colorTheme
export { colorSetVars }
export { lightModeColorTheme, darkModeColorTheme }
