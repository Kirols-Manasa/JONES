 "use client";

import { useEffect, useRef } from "react";
import { Hanken_Grotesk } from "next/font/google";
import Container from "@/Container";

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const jonesRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: any;
    let isMounted = true;

    (async () => {
      const [{ gsap }, { ScrollTrigger }, { SplitText }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("gsap/SplitText"),
      ]);

      if (!isMounted) return;

      gsap.registerPlugin(ScrollTrigger, SplitText);

      ctx = gsap.context(() => {

        // ── JONES — SplitText per char ──
        const split = new SplitText(jonesRef.current, { type: "chars" });

        gsap.set(jonesRef.current, { opacity: 1 });

        gsap.fromTo(
          split.chars,
          { y: 120, opacity: 0, rotateX: -90, transformOrigin: "50% 0%" },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.75,
            ease: "back.out(1.5)",
            stagger: 0.07,
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // ── JONES — Parallax خروج ──
        gsap.fromTo(
          jonesRef.current,
          { y: 0 },
          {
            y: -50,
            ease: "none",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          }
        );

        // ── DIVIDER ──
        gsap.fromTo(
          dividerRef.current,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 1,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // ── BOTTOM ROW ──
        gsap.fromTo(
          bottomRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.4,
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

      });
    })();

    return () => {
      isMounted = false;
      ctx?.revert();
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className={`${hankenGrotesk.className} bg-[#f9f6f0] border-t border-[#e0dbd1] overflow-hidden`}
    >
      <Container className="pt-[72px] pb-10">

        {/* JONES — يبدأ مخفي والـ GSAP بيظهره */}
        <div
          ref={jonesRef}
          className="text-[clamp(64px,12vw,150px)] font-bold tracking-[0.18em] text-[#1a1a1a] leading-none mb-12 will-change-transform"
          style={{ opacity: 0 }}
        >
          JONES
        </div>

        <div ref={dividerRef} className="h-px bg-[#e0dbd1] mb-7 will-change-transform" />

        <div
          ref={bottomRef}
          className="flex items-center justify-between"
          style={{ opacity: 0 }}
        >
          <span className="text-[11px] text-[#cccccc] tracking-[0.12em] uppercase">
            Est. 2024
          </span>
          <nav className="flex gap-7">
            {["Shop", "About", "Contact", "Privacy"].map((link) => (
              <span
                key={link}
                className="text-xs text-[#aaaaaa] tracking-[0.08em] hover:text-[#1a1a1a] transition-colors duration-200 cursor-pointer"
              >
                {link}
              </span>
            ))}
          </nav>
        </div>

      </Container>
    </footer>
  );
}