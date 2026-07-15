 "use client";

import { useEffect, useRef } from "react";
import Container from "@/Container";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INGREDIENTS = [
  {
    title: "PURE CANE SUGAR",
    body: "The original sweet stuff. No high-fructose corn syrup, just pure natural sweetness for a cleaner, crisper finish.",
  },
  {
    title: "NATURAL EXTRACTS",
    body: "Premium oils and essences extracted directly from fruits and spices to give our sodas their legendary, bold character.",
  },
  {
    title: "FILTERED WATER",
    body: "Crystal clear, triple-filtered water provides the perfect canvas for our flavor profiles to shine without interference.",
  },
  {
    title: "CO2 BUBBLES",
    body: "Precisely calibrated carbonation levels to ensure that signature Jones tingle and a refreshing, sharp mouthfeel.",
  },
];

export default function Formula() {
  const videoSectionRef = useRef<HTMLElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const listSectionRef = useRef<HTMLElement>(null);
  const headerEyebrowRef = useRef<HTMLSpanElement>(null);
  const headerTitleRef = useRef<HTMLHeadingElement>(null);
  const rowRefs = useRef<Array<HTMLDivElement | null>>([]);
  const barRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const titleRefs = useRef<Array<HTMLSpanElement | null>>([]);

  const titleText = "SIMPLE. REAL.";

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── VIDEO TRANSITION ──
      gsap.fromTo(
        videoWrapRef.current,
        { clipPath: "inset(35% 35% 35% 35% round 16px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          ease: "none",
          scrollTrigger: {
            trigger: videoSectionRef.current,
            start: "top bottom",
            end: "center center",
            scrub: 0.6,
          },
        }
      );

      gsap.fromTo(
        videoRef.current,
        { scale: 1.15 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: videoSectionRef.current,
            start: "top bottom",
            end: "center center",
            scrub: 0.6,
          },
        }
      );

      ScrollTrigger.create({
        trigger: videoSectionRef.current,
        start: "top 60%",
        end: "bottom 40%",
        onEnter: () => videoRef.current?.play(),
        onEnterBack: () => videoRef.current?.play(),
        onLeave: () => videoRef.current?.pause(),
        onLeaveBack: () => videoRef.current?.pause(),
      });

      // ── HEADER: fade + slide up ──
      gsap.fromTo(
        headerEyebrowRef.current,
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: listSectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // تحريك الحروف المقسمة مسبقاً في JSX
      const titleEl = headerTitleRef.current;
      if (titleEl) {
        const innerSpans = titleEl.querySelectorAll(".char-inner");
        gsap.fromTo(
          innerSpans,
          { y: "100%" },
          {
            y: "0%",
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.04,
            scrollTrigger: {
              trigger: listSectionRef.current,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // ── ROWS ANIMATION ──
      gsap.fromTo(
        rowRefs.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: listSectionRef.current,
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, [videoSectionRef, listSectionRef]);

    return () => ctx.revert();
  }, []);

  // إدارة حركات التحويم (Hover) برمجياً عبر دوال React لضمان التنظيف التلقائي
  const handleMouseEnter = (index: number) => {
    const bar = barRefs.current[index];
    const title = titleRefs.current[index];
    if (bar) gsap.to(bar, { opacity: 1, duration: 0.25, ease: "power2.out" });
    if (title) gsap.to(title, { x: 6, duration: 0.3, ease: "power2.out" });
  };

  const handleMouseLeave = (index: number) => {
    const bar = barRefs.current[index];
    const title = titleRefs.current[index];
    if (bar) gsap.to(bar, { opacity: 0, duration: 0.25, ease: "power2.out" });
    if (title) gsap.to(title, { x: 0, duration: 0.3, ease: "power2.out" });
  };

  return (
    <>
      {/* VIDEO SECTION */}
      <section ref={videoSectionRef} className="relative w-full h-[140vh] bg-white">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <div
            ref={videoWrapRef}
            className="relative w-full h-full overflow-hidden"
            style={{ clipPath: "inset(35% 35% 35% 35% round 16px)" }}
          >
            <video
              ref={videoRef}
              src="/videos/video.mp4"
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        </div>
      </section>

      {/* FORMULA SECTION */}
      <section ref={listSectionRef} className="w-full bg-white py-16 md:py-20">
        <Container>
          <div className="flex flex-col gap-2 mb-10 md:mb-14">
            {/* تحسين التباين هنا لتصبح text-gray-600 بدلاً من text-gray-400 */}
            <span
              ref={headerEyebrowRef}
              className="text-label-sm uppercase tracking-widest text-gray-600"
            >
              What&apos;s Inside
            </span>
            {/* تقسيم الحروف هنا مباشرة في الـ JSX لمنع الـ CLS */}
            <h2
              ref={headerTitleRef}
              className="text-display text-black leading-tight whitespace-nowrap"
            >
              {titleText.split("").map((char, index) =>
                char === " " ? (
                  <span key={index} style={{ display: "inline-block" }}>
                    &nbsp;
                  </span>
                ) : (
                  <span
                    key={index}
                    style={{ display: "inline-block", overflow: "hidden" }}
                  >
                    <span
                      className="char-inner"
                      style={{ display: "inline-block" }}
                    >
                      {char}
                    </span>
                  </span>
                )
              )}
            </h2>
          </div>

          <div className="flex flex-col">
            {INGREDIENTS.map((item, i) => (
              <div
                key={i}
                ref={(el) => {
                  rowRefs.current[i] = el;
                }}
                onMouseEnter={() => handleMouseEnter(i)}
                onMouseLeave={() => handleMouseLeave(i)}
                onTouchStart={() => handleMouseEnter(i)}
                onTouchEnd={() => handleMouseLeave(i)}
                className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 py-7 md:py-9 border-t border-black/10 items-start cursor-pointer select-none"
              >
                <div className="md:col-span-5 flex items-start gap-4">
                  <span
                    ref={(el) => {
                      barRefs.current[i] = el;
                    }}
                    className="block w-[3px] h-7 mt-1 bg-black opacity-0 shrink-0"
                  />
                  <span
                    ref={(el) => {
                      titleRefs.current[i] = el;
                    }}
                    className="text-headline-md text-black leading-snug inline-block"
                  >
                    {item.title}
                  </span>
                </div>

                <div className="md:col-span-7">
                  {/* تحسين التباين هنا لتصبح text-gray-600 بدلاً من text-gray-500 */}
                  <p className="text-body-md text-gray-600 max-w-prose leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}

            <div className="border-t border-black/10" />
          </div>
        </Container>
      </section>
    </>
  );
}