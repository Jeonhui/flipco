import React from "react"
import { Container, Layout, Link, Text } from "@design-system/components"

export default function NotFound() {
  return (
    <Layout alignment={"columnCenter"}>
      <Container gap={"large"} style={{ marginBottom: "10rem" }}>
        <Container alignment={"columnCenter"}>
          <Text typography={"display1_bold"} color={"text"}>
            404
          </Text>
          <Text typography={"header6"} color={"text"}>
            페이지를 찾을 수 없습니다.
          </Text>
        </Container>
        <Link size={"xSmall"} href={"/"}>
          홈으로 돌아가기
        </Link>
      </Container>
    </Layout>
  )
}
