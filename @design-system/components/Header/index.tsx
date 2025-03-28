"use client"

import React, { useEffect, useRef, useState } from "react"
import { clsx } from "clsx"
import * as styles from "./styles.css"
import HeaderItems from "./HeaderItems"
import Container from "../Container"
import ThemeToggleButton from "../ThemeToggleButton"
import Link from "../Link"
import GradientIconLink from "../GradientIconLink"
import { HamburgerMenuButton } from "./components"
import { LogoIconClipPath } from "../../assets/clipPath"

type HeaderProps = {
  root?: string
  showMenu?: boolean
  items: HeaderItems
}

const Header = ({ root = "/", showMenu = false, items, ...props }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const headerContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const outSideClick = (e: MouseEvent) => {
      setIsOpen((prev) => {
        return !!(
          prev &&
          headerContainerRef.current &&
          headerContainerRef.current.contains(e.target as Node)
        )
      })
    }
    document.addEventListener("click", outSideClick)
  }, [])

  const onHeaderMenuLinkClickHandler = () => {
    setIsOpen(false)
  }

  return (
    <Container
      ref={headerContainerRef}
      alignment={"columnCenter"}
      layout={"fullWidth"}
      className={clsx(styles.headerContainer)}
    >
      <Container
        alignment={"rowCenter"}
        layout={"fullWidth"}
        className={clsx(styles.header)}
        {...props}
      >
        <GradientIconLink clipPathId={"logoIconClipPath"} href={root}>
          <LogoIconClipPath clipPathId={"logoIconClipPath"} />
        </GradientIconLink>
        <Container header-item={"true"} gap={"xSmall"} padding={"none"}>
          {showMenu && (
            <>
              {items.items.map((item, idx) => (
                <Link
                  href={item.href}
                  key={idx}
                  size={"xSmall"}
                  color={"text"}
                  data-media-hidden-item={true}
                >
                  {item.name}
                </Link>
              ))}{" "}
              <Container
                alignment={"rowTopCenter"}
                gap={"xSmall"}
                data-media-hidden-item={true}
              >
                {items.iconNameItems?.map((item, idx) => (
                  <Link key={idx} href={item.href} size={"xSmall"} color={"text"}>
                    {item.name}
                  </Link>
                ))}
                <ThemeToggleButton size={"xSmall"} />
              </Container>
            </>)
          }
          {showMenu && <HamburgerMenuButton
            data-media-show-item={true}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />}
        </Container>
      </Container>
      {showMenu && (<Container
        layout={"fullWidth"}
        alignment={"columnCenterLeft"}
        gap={"small"}
        header-menu-item={"true"}
        header-menu-item-open={isOpen.toString()}
      >
        {items.items.map((item, idx) => (
          <Link
            onClick={onHeaderMenuLinkClickHandler}
            href={item.href}
            key={idx}
            size={"xSmall_full"}
            color={"text"}
            alignment={"rowCenterLeft"}
            data-media-hidden-item={true}
          >
            {item.name}
          </Link>
        ))}
        <Container
          className={clsx(styles.hamburgerMenuIconContainer)}
          alignment={"rowTopLeft"}
          layout={"fullWidth"}
          gap={"xSmall"}
        >
          {items.iconNameItems?.map((item, idx) => (
            <Link
              onClick={onHeaderMenuLinkClickHandler}
              key={idx}
              href={item.href}
              size={"medium"}
              color={"text"}
            >
              {item.icon}
            </Link>
          ))}
          <ThemeToggleButton size={"medium"} />
        </Container>
      </Container>)}
    </Container>
  )
}

export type { HeaderItems }
export default Header
