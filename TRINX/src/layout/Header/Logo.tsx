 "use client";

import { forwardRef, useRef, useEffect } from "react";
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
   Logo Entrance Animation Settings
   "نزول حقيقي من برة الفريم" — الحروف بتدخل من فوق حافة
   الهيدر تماماً وبتقف في مكانها، من غير أي blur، وضوح
   كامل من أول لحظة.
========================================================= */

const LOGO_ENTRANCE_FROM = {
  y: -140,
  opacity: 1,
};

const LOGO_ENTRANCE_TO = {
  y: 0,
  duration: 0.85,
  ease: "power3.out",
  stagger: 0.045,
};

// ثانية قبل ما يبدأ نزول اللوجو (سيبها 0 لو عايزه يبدأ فوراً)
const LOGO_ENTRANCE_DELAY = 0;

/* =========================================================
   Logo Component
========================================================= */

const Logo = forwardRef<HTMLAnchorElement, LogoProps>(({ animate = true }, ref) => {
  const logoRef = useRef<HTMLAnchorElement | null>(null);
  const touchTlRef = useRef<gsap.core.Timeline | null>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const setRefs = (el: HTMLAnchorElement | null) => {
    logoRef.current = el;

    if (typeof ref === "function") {
      ref(el);
    } else if (ref) {
      ref.current = el;
    }
  };

  useEffect(() => {
    if (!animate) return;

    const chars = charRefs.current.filter(Boolean) as HTMLSpanElement[];
    if (!chars.length) return;

    const ctx = gsap.context(() => {
      gsap.set(chars, LOGO_ENTRANCE_FROM);
      gsap.to(chars, {
        ...LOGO_ENTRANCE_TO,
        delay: LOGO_ENTRANCE_DELAY,
      });
    });

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        overflow: animate ? "hidden" : undefined,
      }}
    >
      {"JONES".split("").map((char, i) => (
        <span
          key={i}
          ref={(el) => {
            charRefs.current[i] = el;
          }}
          className="inline-block"
          style={{ willChange: "transform" }}
        >
          {char}
        </span>
      ))}
    </a>
  );
});

Logo.displayName = "Logo";

export default Logo;