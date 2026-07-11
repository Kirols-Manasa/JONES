 "use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const refresh = () => ScrollTrigger.refresh();
    refresh();
    window.addEventListener("introDone", refresh);

    return () => {
      window.removeEventListener("introDone", refresh);
    };
  }, []);

  return <>{children}</>;
}