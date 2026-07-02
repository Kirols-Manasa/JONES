 "use client";

import { forwardRef, useRef } from "react";
import { gsap } from "gsap";

type LogoProps = {
  animate?: boolean;
};

/* =========================================================
   Logo Hover Animation Settings
========================================================= */

const LOGO_HOVER_IN = {
  y: -2,
  scale: 1.015,
  letterSpacing: "0.015em",
  textShadow: "0 8px 22px rgba(0,0,0,0.16)",
  duration: 0.35,
  ease: "power3.out",
};

const LOGO_HOVER_OUT = {
  y: 0,
  scale: 1,
  letterSpacing: "0em",
  textShadow: "0 0 0 rgba(0,0,0,0)",
  duration: 0.32,
  ease: "power3.out",
};

/* =========================================================
   Logo Component
========================================================= */

const Logo = forwardRef<HTMLAnchorElement, LogoProps>(({ animate = true }, ref) => {
  const logoRef = useRef<HTMLAnchorElement | null>(null);
  const touchTlRef = useRef<gsap.core.Timeline | null>(null);

  const setRefs = (el: HTMLAnchorElement | null) => {
    logoRef.current = el;

    if (typeof ref === "function") {
      ref(el);
    } else if (ref) {
      ref.current = el;
    }
  };

  const handleMouseEnter = () => {
    const el = logoRef.current;
    if (!el) return;

    gsap.killTweensOf(el);
    gsap.to(el, LOGO_HOVER_IN);
  };

  const handleMouseLeave = () => {
    const el = logoRef.current;
    if (!el) return;

    gsap.killTweensOf(el);
    gsap.to(el, LOGO_HOVER_OUT);
  };

  const handleTouchStart = () => {
    const el = logoRef.current;
    if (!el) return;

    touchTlRef.current?.kill();
    gsap.killTweensOf(el);

    touchTlRef.current = gsap
      .timeline()
      .to(el, LOGO_HOVER_IN)
      .to(el, LOGO_HOVER_OUT, "+=0.18");
  };

  return (
    <a
      ref={setRefs}
      href="/"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      className="text-[40px] font-bold tracking-tight text-gray-900 inline-block whitespace-nowrap"
      style={{
        letterSpacing: "0em",
        transformOrigin: "center",
        willChange: "transform, text-shadow, letter-spacing",
        ...(animate ? { clipPath: "inset(0 100% 0 0)" } : undefined),
      }}
    >
      {"JONES".split("").map((char, i) => (
        <span
          key={i}
          className="inline-block"
          style={animate ? { opacity: 0, transform: "translateY(40px)" } : undefined}
        >
          {char}
        </span>
      ))}
    </a>
  );
});

Logo.displayName = "Logo";

export default Logo;