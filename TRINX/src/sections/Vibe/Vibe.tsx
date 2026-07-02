"use client";

import Image from "next/image";
import Container from "@/Container";

export default function Vibe() {
  return (
     <section id="our-story" className="relative w-full min-h-screen overflow-hidden">

      {/* ── BACKGROUND IMAGE ── */}
      <Image
         src="/images/jones-soda-StrawLime-UGC.webp"
        alt="Jones Soda Community"
        fill
        className="object-cover"
        priority
      />

      {/* ── OVERLAY ── */}
      <div className="absolute inset-0 bg-black/50" />

      {/* ── CONTENT ── */}
      <div className="relative z-10 flex items-center min-h-screen">
        <Container>
          <div className="flex flex-col gap-6 max-w-xl">

            {/* eyebrow */}
             <span className="text-label-sm uppercase tracking-widest text-white/75">
              Culture & Community
            </span>

            {/* headline */}
            <h2 className="text-display text-white">
              SODA FOR THE
              <br />
              REAL ONES.
            </h2>

            {/* body */}
         <p className="text-body-lg text-white/70 max-w-[500px]">
  Jones isn't just what you drink — it's who you are. From skate
  parks to beach days, our bottles belong wherever life gets
  interesting. We celebrate the unique, the weird, and the authentic.
</p>

            {/* CTA */}
            <div>
              <a
                href="/community"
                className="inline-block border-[3px] border-white text-white text-label-sm uppercase tracking-widest px-8 py-4 rounded-[2.5px] hover:bg-white hover:text-black transition-colors duration-300"
              >
                Join the Community
              </a>
            </div>

          </div>
        </Container>
      </div>

    </section>
  );
}