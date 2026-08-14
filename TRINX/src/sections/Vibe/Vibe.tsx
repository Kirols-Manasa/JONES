 "use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "@/Container";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Vibe() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgWrapRef.current,
        { y: 0 },
        {
          y: -90,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        }
      );

      gsap.fromTo(
        imgWrapRef.current,
        { scale: 1.06 },
        {
          scale: 1.16,
          duration: 18,
          ease: "none",
          repeat: -1,
          yoyo: true,
        }
      );

      gsap.fromTo(
        overlayRef.current,
        { opacity: 0.15 },
        {
          opacity: 0.35,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "top 30%",
            scrub: 0.6,
          },
        }
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        eyebrowRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "elastic.out(1, 0.6)" }
      )
        .fromTo(
          headlineRef.current,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "elastic.out(1, 0.5)" },
          "-=0.3"
        )
        .fromTo(
          bodyRef.current,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "elastic.out(1, 0.6)" },
          "-=0.6"
        )
        .fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "elastic.out(1, 0.6)" },
          "-=0.5"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="our-story"
      className="relative w-full min-h-screen overflow-hidden"
    >
      <div
        ref={imgWrapRef}
        className="absolute will-change-transform"
        style={{
          top: 0,
          left: 0,
          right: 0,
          bottom: "-150px",
          transformOrigin: "center top",
        }}
      >
        <Image
          src="/images/photo-2.webp"
          alt="Jones Soda Community"
          fill
          loading="lazy"
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "center top" }}
        />
      </div>

      <div ref={overlayRef} className="absolute inset-0 bg-black" style={{ opacity: 0.15 }} />

      <div className="relative z-10 flex items-center min-h-screen">
        <Container>
          <div className="flex flex-col gap-6 max-w-full">

            <Link href="/community">
              <span
                ref={eyebrowRef}
                // ✅ أضفنا willChange
                style={{ opacity: 0, transform: "translateY(20px)", willChange: "opacity, transform" }}
                className="text-label-sm uppercase tracking-widest text-white/75 cursor-pointer hover:text-white transition-colors duration-300"
              >
                Culture & Community
              </span>
            </Link>

            <h2
              ref={headlineRef}
              // ✅ أضفنا willChange
              style={{ opacity: 0, transform: "translateY(60px)", willChange: "opacity, transform" }}
              className="text-display text-white"
            >
              SODA FOR THE
              <br />
              REAL ONES.
            </h2>

            <p
              ref={bodyRef}
              // ✅ أضفنا willChange
              style={{ opacity: 0, transform: "translateY(25px)", willChange: "opacity, transform" }}
              className="text-body-lg text-white/70 max-w-[500px]"
            >
              Jones isn&apos;t just what you drink — it&apos;s who you are. From skate
              parks to beach days, our bottles belong wherever life gets
              interesting. We celebrate the unique, the weird, and the authentic.
            </p>

            <div
              ref={ctaRef}
              // ✅ أضفنا willChange
              style={{ opacity: 0, transform: "translateY(20px)", willChange: "opacity, transform" }}
            >
              <div>
                <button className="inline-block border-[3px] border-white text-white text-label-sm uppercase tracking-widest px-8 py-4 rounded-[2.5px] hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer">
                  Join the Community
                </button>
              </div>
            </div>

          </div>
        </Container>
      </div>
    </section>
  );
}