import { Icon, IconProps } from "@design-system/assets/icon"

const MuteIcon = (props: IconProps) => {
  return (
    <Icon viewBox={"0 0 1024 1024"} {...props}>
      <path fillRule="evenodd" clipRule="evenodd"
            d="M483.07 380.972L649.309 273.476C675.924 256.266 711.029 275.371 711.029 307.066V608.931L483.07 380.972ZM637.903 744.001L312 418.098V625C312 636.046 320.954 645 332 645H484.801L637.903 744.001Z"
      />
      <path
        d="M225.2 225.2C242.799 207.6 271.334 207.6 288.933 225.2L798.8 735.067C816.4 752.666 816.4 781.201 798.8 798.8C781.201 816.4 752.666 816.4 735.067 798.8L225.2 288.933C207.6 271.334 207.6 242.799 225.2 225.2Z"
      />
    </Icon>
  )
}

export default MuteIcon
