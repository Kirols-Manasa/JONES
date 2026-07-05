 "use client";

import Image from "next/image";
import Link from "next/link";
import Container from "@/Container";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = containerRef.current?.querySelectorAll("[data-reveal]");
       const paragraph = containerRef.current?.querySelector<HTMLElement>("[data-hero-paragraph]");
const cta = containerRef.current?.querySelector<HTMLElement>("[data-hero-cta]");

      // ✅ مش محتاج paused: true ولا أي علاقة بالانترو
      // الـ globalTimeline هو اللي بيتحكم — لو الانترو لسه شغال، الـ tl دي هتتعمل
      // بس مش هتتحرك غير لما الانترو يعمل resume()
      const tl = gsap.timeline();

      lines?.forEach((line, i) => {
        tl.fromTo(
          line,
          { clipPath: "inset(0 100% 0 0)", x: -14, skewX: -4 },
          {
            clipPath: "inset(0 0% 0 0)",
            x: 0,
            skewX: 0,
            duration: 0.95,
            ease: "power4.inOut",
          },
          i * 0.16
        );
      });
if (!paragraph || !cta) return
      tl.from(
        paragraph,
        { opacity: 0, y: 12, duration: 0.55, ease: "power2.out" },
        "-=0.35"
      ).from(cta, { opacity: 0, y: 10, duration: 0.45, ease: "power2.out" }, "-=0.25");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative min-h-screen w-full bg-white overflow-hidden">
      <Container className="h-full">
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 min-h-screen items-center gap-10 pt-24 pb-16"
        >
          {/* LEFT: TEXT + CTA */}
          <div className="flex flex-col justify-center gap-6 h-full">
            <div className="flex flex-col gap-6">
              <h1 className="text-display text-black leading-none">
                <span className="block overflow-hidden">
                  <span
                    data-reveal
                    className="block [mask-image:linear-gradient(to_right,#000_85%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,#000_85%,transparent_100%)]"
                  >
                    MADE FOR
                  </span>
                </span>
                <span className="block overflow-hidden">
                  <span
                    data-reveal
                    className="block font-black text-gray-400 [mask-image:linear-gradient(to_right,#000_85%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,#000_85%,transparent_100%)]"
                  >
                    REAL.
                  </span>
                </span>
              </h1>

              <p
                data-hero-paragraph
                className="text-[5vw] md:text-[2vw] lg:text-[1.4vw] font-black text-gray-500 leading-tight max-w-[52ch]"
              >
                Cane sugar. Pure water. Bold flavor — the original craft soda since 1996.
              </p>
            </div>

            <div data-hero-cta className="mt-2">
              <Link
                href="/shop"
                className="inline-block border-[4px] border-black bg-black text-white px-8 py-3.5 uppercase tracking-widest hover:bg-white hover:text-black transition"
              >
                Shop the Collection
              </Link>
            </div>
          </div>

          {/* RIGHT: IMAGE */}
          <div className="flex items-center justify-center w-full h-[45vh] sm:h-[55vh] md:h-[75vh] lg:h-[85vh]">
            <div className="flex items-center justify-center w-full h-full">
              <Image
                src="/images/cream-white.png"
                alt="Jones Soda Bottle"
                width={700}
                height={1050}
                loading="lazy"
                className="object-contain w-auto h-full max-w-full max-h-full max-sm:h-[90%]"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}