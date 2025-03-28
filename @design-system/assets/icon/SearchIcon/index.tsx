import Icon, { IconProps } from "../common/Icon"

const SearchIcon = (props: IconProps) => {
  return (
    <Icon viewBox={"0 0 1024 1024"} {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M430 631C540.457 631 630 541.457 630 431C630 320.543 540.457 231 430 231C319.543 231 230 320.543 230 431C230 541.457 319.543 631 430 631ZM430 731C595.685 731 730 596.685 730 431C730 265.315 595.685 131 430 131C264.315 131 130 265.315 130 431C130 596.685 264.315 731 430 731Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M858.203 928.914L603.645 674.355L674.355 603.645L928.914 858.203C948.44 877.729 948.44 909.387 928.914 928.914C909.388 948.44 877.729 948.44 858.203 928.914Z"
      />
    </Icon>
  )
}

export default SearchIcon
