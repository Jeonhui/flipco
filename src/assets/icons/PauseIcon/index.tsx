import { Icon, IconProps } from "@design-system/assets/icon"

const PauseIcon = (props: IconProps) => {
  return (
    <Icon viewBox={"0 0 1024 1024"} {...props}>
      <rect x="262" y="136" width="180" height="650" rx="90" />
      <rect x="562" y="136" width="180" height="650" rx="90" />
    </Icon>
  )
}

export default PauseIcon
