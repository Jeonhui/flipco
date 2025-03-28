import { ReactElement } from "react"

type HeaderItem = {
  name: string
  href: string
}

type HeaderIconNameItems = {
  icon: ReactElement
  name: string
  href: string
}

type HeaderItems = {
  items: HeaderItem[]
  iconNameItems?: HeaderIconNameItems[]
}

export default HeaderItems
