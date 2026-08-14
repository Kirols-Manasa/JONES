 "use client";

import { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import Container from "@/Container";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SHOP_HREF = "/shop";

const PRODUCTS = [
  { name: "JONES", flavor: "BERRY LEMONADE", slug: "berry-lemonade", size: "12-PACK / 12OZ GLASS BOTTLES", image: "/images/berry-blue.webp" },
  { name: "JONES", flavor: "ROOT BEER", slug: "root-beer", size: "12-PACK / 12OZ GLASS BOTTLES", image: "/images/chocolate.webp" },
  { name: "JONES", flavor: "GREEN APPLE", slug: "green-apple", size: "12-PACK / 12OZ GLASS BOTTLES", image: "/images/green.webp" },
  { name: "JONES", flavor: "STRAWBERRY LIME", slug: "strawberry-lime", size: "12-PACK / 12OZ GLASS BOTTLES", image: "/images/red.webp" },
  { name: "JONES", flavor: "ORANGE & CREAM", slug: "orange-cream", size: "12-PACK / 12OZ GLASS BOTTLES", image: "/images/orange.webp" },
  { name: "JONES", flavor: "CREAM SODA", slug: "cream-soda", size: "12-PACK / 12OZ GLASS BOTTLES", image: "/images/cream-white.webp" },
];

const CARD_CLASSES = [
  "group", "relative", "flex", "flex-col", "bg-white", "border", "border-gray-400",
  "overflow-hidden", "hover:border-black", "transition-colors", "duration-300",
].join(" ");

const IMAGE_WRAP_CLASSES =
  "relative flex items-center justify-center h-[60vh] md:h-[420px] p-6 overflow-hidden";

const IMAGE_CLASSES =
  "object-contain h-full w-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-105 transition-transform duration-500";

const SHADE_CLASSES = [
  "pointer-events-none", "absolute", "inset-x-0", "bottom-0", "h-1/2",
  "bg-gradient-to-t", "from-black/50", "to-transparent", "opacity-0",
  "[@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-100",
  "transition-opacity", "duration-300",
].join(" ");

const SHADE_TEXT_CLASSES = [
  "pointer-events-none", "absolute", "inset-x-0", "bottom-0", "flex", "justify-center",
  "pb-4", "text-white", "text-label-sm", "uppercase", "tracking-widest",
  "opacity-0", "translate-y-3",
  "[@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-100",
  "[@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-y-0",
  "transition-all", "duration-300", "ease-out",
].join(" ");

const RIBBON_CLASSES = [
  "pointer-events-none", "absolute", "top-3", "right-3", "bg-black", "text-white",
  "text-[10px]", "font-medium", "uppercase", "tracking-widest", "px-3", "py-1",
  "rounded-full", "opacity-100",
  "[@media(hover:hover)_and_(pointer:fine)]:opacity-0", "transition-opacity", "duration-300",
].join(" ");

// ⚡ تعديل: كل حرف دلوقتي بيترندر مخفي من البداية (y:110%, opacity:0)
// بدل ما يظهر عادي وبعدين GSAP يخفيه فجأة لحظة ما الـ scrollTrigger يشتغل.
// ده اللي كان بيسبب Layout Shift محسوب في CLS.
function splitToChars(text: string) {
  return text.split("").map((char, i) => (
    <span
      key={i}
      className="inline-block overflow-hidden"
      style={{ verticalAlign: "top" }}
    >
      <span
        className="split-char inline-block will-change-transform"
        style={{ transform: "translateY(110%)", opacity: 0 }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    </span>
  ));
}

export default function MenuSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const headerWrapRef = useRef<HTMLDivElement>(null);

  const titleChars = useMemo(() => splitToChars("THE ESSENTIALS"), []);
  const subtitleChars = useMemo(
    () => splitToChars("Available for nationwide delivery"),
    []
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleCharEls = titleRef.current?.querySelectorAll(".split-char");
      const subtitleCharEls = subtitleRef.current?.querySelectorAll(".split-char");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: headerWrapRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      if (titleCharEls) {
        tl.fromTo(
          titleCharEls,
          { y: "110%", opacity: 0 },
          { y: "0%", opacity: 1, duration: 0.6, ease: "power2.out", stagger: 0.02 }
        );
      }

      if (subtitleCharEls) {
        tl.fromTo(
          subtitleCharEls,
          { y: "110%", opacity: 0 },
          { y: "0%", opacity: 1, duration: 0.5, ease: "power2.out", stagger: 0.01 },
          "-=0.35"
        );
      }
    }, headerWrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full bg-white py-16">
      <Container>
        <div ref={headerWrapRef} className="flex items-end justify-between mb-10">
          <div className="flex flex-col gap-1">
            <h2 ref={titleRef} className="text-headline-lg text-black">
              {titleChars}
            </h2>
            <p ref={subtitleRef} className="text-label-sm uppercase tracking-widest text-gray-400">
              {subtitleChars}
            </p>
          </div>
          <Link
            href="/shop"
            className="text-label-sm uppercase tracking-widest text-black border-b border-black pb-0.5 hover:text-gray-500 hover:border-gray-500 transition-colors whitespace-nowrap"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
           {PRODUCTS.map((product, index) => (
            <Link
              key={product.slug}
              href={`${SHOP_HREF}#${product.slug}`}
              scroll={false}
              className={CARD_CLASSES}
            >
              <div className={IMAGE_WRAP_CLASSES}>
                <Image
  src={product.image}
  alt={product.flavor}
  width={300}
  height={400}
  loading={index === 0 ? "eager" : "lazy"}
  priority={index === 0}
  quality={85}
  sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
  className={IMAGE_CLASSES}
  style={{ aspectRatio: "300/400" }}
/>
                <div className={SHADE_CLASSES} />
                <span className={SHADE_TEXT_CLASSES}>View product</span>
                <span className={RIBBON_CLASSES}>Shop now</span>
              </div>

              <div className="flex flex-col gap-1 px-5 py-4 border-t border-black/10">
                <span className="text-label-sm uppercase tracking-widest text-gray-400">
                  {product.name}
                </span>
                <span className="text-headline-md text-black">
                  {product.flavor}
                </span>
                <span className="text-label-sm uppercase tracking-widest text-gray-400">
                  {product.size}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>Set-Content .gitignore "node_modules/`n.env`n.env.local`n.next/`ndist/"
    </section>
  );
}