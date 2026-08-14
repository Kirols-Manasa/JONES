"use client";

import dynamic from "next/dynamic";

const HoverMouse = dynamic(() => import("@/hoverMous"), { ssr: false });

export default function ClientOnly() {
  return <HoverMouse />;
}