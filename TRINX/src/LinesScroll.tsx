 "use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // مش بنشغل Lenis على موبايل عشان يحسن الأداء
    if (window.matchMedia("(pointer: coarse)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 1.5,
      touchMultiplier: 1.2,
      infinite: false,
    });

    (window as unknown as Record<string, unknown>).lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

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