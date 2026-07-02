"use client";
import { useEffect, useState } from "react";

const BREAKPOINTS = {
  mobile: { maxWidth: 767, margin: 16, columns: 4, gutter: 16, label: "Mobile" },
  tablet: { maxWidth: 1023, margin: 40, columns: 8, gutter: 16, label: "Tablet" },
  desktop: { maxWidth: Infinity, margin: 80, columns: 12, gutter: 24, label: "Desktop" },
};

function getBreakpoint(width: number) {
  if (width <= BREAKPOINTS.mobile.maxWidth) return BREAKPOINTS.mobile;
  if (width <= BREAKPOINTS.tablet.maxWidth) return BREAKPOINTS.tablet;
  return BREAKPOINTS.desktop;
}

export default function GridOverlay() {
  const [visible, setVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "g") setVisible((v) => !v);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    const updateWidth = () => setWindowWidth(window.innerWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  if (!visible || windowWidth === 0) return null;

  const { margin, columns, gutter, label } = getBreakpoint(windowWidth);

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", display: "flex", pointerEvents: "none", zIndex: 9999 }}>
      <div style={{ width: `${margin}px`, height: "100%", background: "rgba(0, 200, 255, 0.15)", flexShrink: 0 }} />
      <div style={{ flex: 1, display: "flex", gap: `${gutter}px`, height: "100%" }}>
        {Array.from({ length: columns }).map((_, i) => (
          <div key={i} style={{ flex: 1, height: "100%", background: "rgba(255, 0, 80, 0.1)" }} />
        ))}
      </div>
      <div style={{ width: `${margin}px`, height: "100%", background: "rgba(0, 200, 255, 0.15)", flexShrink: 0 }} />
      <div style={{ position: "fixed", bottom: 16, left: 16, background: "rgba(0,0,0,0.75)", color: "#fff", fontSize: 12, fontFamily: "monospace", padding: "6px 10px", borderRadius: 6 }}>
        {label} — {windowWidth}px — {columns} cols
      </div>
    </div>
  );
}