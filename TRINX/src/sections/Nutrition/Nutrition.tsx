 "use client";

import Container from "@/Container";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 6,   display: "6",    suffix: "",  label: "Core Flavors"  },
  { value: 100, display: "100%", suffix: "%", label: "Cane Sugar"    },
  { value: 355, display: "355",  suffix: "",  label: "ML Per Bottle" },
  { value: 0,   display: "0g",   suffix: "g", label: "Total Fat"     },
];

export default function Nutrition() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const valueEls = sectionRef.current?.querySelectorAll<HTMLElement>("[data-stat-value]");
      const labelEls = sectionRef.current?.querySelectorAll<HTMLElement>("[data-stat-label]");

      valueEls?.forEach((el, i) => {
        const target = stats[i]!.value;
        const suffix = stats[i]!.suffix;
        const obj = { val: 0 };

        gsap.fromTo(el,
          { opacity: 0, skewX: -20, x: -20 },
          {
            opacity: 1, skewX: 0, x: 0,
            duration: 0.7,
            ease: "power3.out",
            delay: i * 0.15,
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
          }
        );

        gsap.to(obj, {
          val: target,
          duration: 1.6,
          ease: "power2.out",
          delay: i * 0.15,
          onUpdate: () => { el.textContent = Math.round(obj.val) + suffix; },
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        });
      });

      labelEls?.forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
            delay: i * 0.15 + 0.5,
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white py-12 sm:py-16">
      <Container>
        <div className="grid grid-cols-4 divide-x divide-black/10 text-center w-full overflow-hidden">
          {stats.map(({ display, suffix, label }) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center gap-2 min-h-[110px] px-2"
            >
              <span
                data-stat-value
                data-suffix={suffix}
                style={{ opacity: 0, transform: "skewX(-20deg) translateX(-20px)" }}
                className="text-[32px] md:text-headline-lg text-black leading-none tracking-tight"
              >
                {display}
              </span>
              <span
                data-stat-label
                style={{ opacity: 0 }}
                className="text-label-sm uppercase tracking-widest text-gray-400 leading-tight"
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}