 "use client";

import Image from "next/image";
import Link from "next/link";
import Container from "@/Container";
import { useEffect, useRef } from "react";

export default function Culture() {
  const sectionRef = useRef<HTMLElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const h2Ref = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

   
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

      // ── CURTAIN ──
      gsap.fromTo(curtainRef.current,
        { yPercent: 0 },
        {
          yPercent: -100,
          duration: 1.1,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // ── IMAGE PARALLAX ──
      gsap.fromTo(imgRef.current,
        { y: 40 },
        {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );

      // ── SPLIT TEXT ANIMATION على الـ h2 ──
      const split = new SplitText(h2Ref.current, {
        type: "chars,words",
      });

      gsap.set(h2Ref.current, { opacity: 1 }); // إظهار الـ h2 أولاً

      gsap.fromTo(
        split.chars,
        { y: 80, opacity: 0, rotateX: -90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.025,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // ── PARAGRAPH + CTA ──
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(paraRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
        0.5  // تبدأ بعد نص الـ stagger تقريباً
      )
      .fromTo(ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
        "-=0.45"
      );

      // ── TEXT PARALLAX خروج ──
      gsap.fromTo(h2Ref.current, { y: 0 }, {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "center center",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.fromTo(paraRef.current, { y: 0 }, {
        y: -20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "center center",
          end: "bottom top",
          scrub: 1.4,
        },
      });

    });
  })();

  return () => {
    isMounted = false;
    ctx?.revert();
  };
}, []);

  return (
    <section ref={sectionRef} className="w-full bg-black py-20">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-stretch">

          {/* IMAGE + CURTAIN */}
          <div className="relative overflow-hidden group">
            <div ref={imgRef} className="will-change-transform">
              <Image
                src="/images/photo.webp"
                alt="Jones Soda Community"
                width={700}
                height={800}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 50vw"
                className="w-full h-[400px] md:h-[550px] object-cover transition-all duration-700 grayscale hover:grayscale-0 [@media(hover:none)]:grayscale-0"
                style={{ aspectRatio: "700/800" }}
              />
            </div>
            <div
              ref={curtainRef}
              className="absolute inset-0 bg-black will-change-transform"
            />
          </div>

          {/* TEXT */}
          <div className="flex flex-col gap-8 py-6 md:py-10 justify-center">
            <h2
              ref={h2Ref}
              className="text-display text-white italic max-w-[12ch] will-change-transform"
              style={{ opacity: 0 }}
            >
              THE PHOTO ON THE LABEL<br />
              COULD BE YOURS.
            </h2>

            <div className="flex flex-col gap-8">
              <p
                ref={paraRef}
                className="text-body-lg text-white/70 italic max-w-[36ch] will-change-transform"
                style={{ opacity: 0 }}
              >
                Since day one, we've invited you to submit your photos. Thousands of stories
                have lived on our labels, traveling from hands to hands across the globe.
              </p>

              <div ref={ctaRef} style={{ opacity: 0 }}>
                <Link
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="inline-flex items-center text-label-sm uppercase tracking-widest text-white border-b border-white pb-1 hover:text-white/60 hover:border-white/60 transition-colors cursor-pointer"
                >
                  Submit Your Photo
                </Link>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}