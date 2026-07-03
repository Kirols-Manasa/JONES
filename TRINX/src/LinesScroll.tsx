 "use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp:            0.08,
      smoothWheel:     true,
      wheelMultiplier: 1.5,
      touchMultiplier: 1.2,
      infinite:        false,
    });

    (window as unknown as Record<string, unknown>).lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      (window as unknown as Record<string, unknown>).lenis = undefined;
    };
  }, []);

  return <>{children}</>;
}