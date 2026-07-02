 "use client";

import { useEffect } from "react";
import Lenis from "lenis";

declare global {
  interface Window {
    lenis?: Lenis;
  }
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp:            0.08,
      smoothWheel:     true,
      wheelMultiplier: 1.5,
      touchMultiplier: 1.2,
      infinite:        false,
    });

    window.lenis = lenis; // <-- الإضافة الوحيدة

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      window.lenis = undefined;
    };
  }, []);

  return <>{children}</>;
}