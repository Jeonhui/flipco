"use client";

import dynamic from "next/dynamic";

import type { ComponentProps } from "react";

// Flip 컴포넌트 props 타입 명시
const FlipWrapper = dynamic<ComponentProps<typeof import("./Flip")["default"]>>(
  () => import("./Flip"),
  {
    ssr: false,
  }
);

export default FlipWrapper;