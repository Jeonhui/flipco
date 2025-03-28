import type { Metadata } from "next"
import React, { JSX } from "react"
import ThemeProvider from "@design-system/theme/ThemeProvider"
import { MainLayout } from "@design-system/components"
import { headerItems } from "@/data"
import { METADATA } from "@/constants"

export const metadata: Metadata = METADATA.MAIN

export default function RootLayout({
  children,
}: Readonly<{
  children: JSX.Element
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <React.StrictMode>
          <ThemeProvider>
            <MainLayout headerItems={headerItems}>{children}</MainLayout>
          </ThemeProvider>
        </React.StrictMode>
      </body>
    </html>
  )
}
