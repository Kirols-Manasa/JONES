 "use client";

import Image from "next/image";
import Link from "next/link";
import Container from "@/Container";

// نفس وجهة زرار "View All" بالظبط — كل الكروت هتوديك على /shop
const SHOP_HREF = "/shop";

const PRODUCTS = [
  {
    name: "JONES",
    flavor: "BERRY LEMONADE",
    size: "12-PACK / 12OZ GLASS BOTTLES",
    image:
      "/images/BL_12ozBOTTLE_RGB_1024x1024_8ffd2366-6859-40c6-b8d1-df713a652b16-removebg-preview.png",
  },
  {
    name: "JONES",
    flavor: "ROOT BEER",
    size: "12-PACK / 12OZ GLASS BOTTLES",
    image:
      "/images/RB_12ozBOTTLE_RGB_1024x1024_85ba6c26-3b04-4458-bfa3-57bb7d34ded3-removebg-preview.png",
  },
  {
    name: "JONES",
    flavor: "GREEN APPLE",
    size: "12-PACK / 12OZ GLASS BOTTLES",
    image:
      "/images/GA_12ozBOTTLE_RGB_1024x1024_40058c8f-c71d-4d42-a635-37624f0d31ac-removebg-preview.png",
  },
  {
    name: "JONES",
    flavor: "STRAWBERRY LIME",
    size: "12-PACK / 12OZ GLASS BOTTLES",
    image:
      "/images/SLIME_12ozBOTTLE_RGB_1024x1024_9846967e-8df6-4c19-829a-a50af4dc3fe6-removebg-preview.png",
  },
  {
    name: "JONES",
    flavor: "ORANGE & CREAM",
    size: "12-PACK / 12OZ GLASS BOTTLES",
    image:
      "/images/OC_12ozBOTTLE_RGB_1024x1024_1ebaae76-3280-4401-817e-aa5b61ae9ca5-removebg-preview.png",
  },
  {
    name: "JONES",
    flavor: "CREAM SODA",
    size: "12-PACK / 12OZ GLASS BOTTLES",
    image:
      "/images/CREAM_12ozBOTTLE_RGB_1024x1024_6a616cd7-6659-49bb-835c-2bfff120b295-removebg-preview.png",
  },
];

/* =========================================================
   CTA behavior notes
   - أجهزة فيها ماوس حقيقي (hover:hover + pointer:fine)
     → التأثير: ظل غامق طالع من تحت الصورة + نص "View product"
       بيظهر ويرتفع لفوق، والصورة تفضل واضحة تحته.
   - أجهزة تاتش (موبايل/تابلت، مفيهاش ماوس)
     → شريط "SHOP NOW" ثابت وباين طول الوقت في ركن الصورة،
       لأن الهوفر مش موجود أصلاً على الشاشات دي.
========================================================= */

const CARD_CLASSES = [
  "group",
  "relative",
  "flex",
  "flex-col",
  "bg-white",
  "border",
  "border-gray-400",
  "overflow-hidden",
  "hover:border-black",
  "transition-colors",
  "duration-300",
].join(" ");

const IMAGE_WRAP_CLASSES =
  "relative flex items-center justify-center h-[60vh] md:h-[420px] p-6 overflow-hidden";

const IMAGE_CLASSES =
  "object-contain h-full w-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-105 transition-transform duration-500";

const SHADE_CLASSES = [
  "pointer-events-none",
  "absolute",
  "inset-x-0",
  "bottom-0",
  "h-1/2",
  "bg-gradient-to-t",
  "from-black/50",
  "to-transparent",
  "opacity-0",
  "[@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-100",
  "transition-opacity",
  "duration-300",
].join(" ");

const SHADE_TEXT_CLASSES = [
  "pointer-events-none",
  "absolute",
  "inset-x-0",
  "bottom-0",
  "flex",
  "justify-center",
  "pb-4",
  "text-white",
  "text-label-sm",
  "uppercase",
  "tracking-widest",
  "opacity-0",
  "translate-y-3",
  "[@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-100",
  "[@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-y-0",
  "transition-all",
  "duration-300",
  "ease-out",
].join(" ");

const RIBBON_CLASSES = [
  "pointer-events-none",
  "absolute",
  "top-3",
  "right-3",
  "bg-black",
  "text-white",
  "text-[10px]",
  "font-medium",
  "uppercase",
  "tracking-widest",
  "px-3",
  "py-1",
  "rounded-full",
  "opacity-100",
  "[@media(hover:hover)_and_(pointer:fine)]:opacity-0",
  "transition-opacity",
  "duration-300",
].join(" ");

export default function MenuSection() {
  return (
    <section className="w-full bg-white py-16">
      <Container>
        {/* ── HEADER ── */}
        <div className="flex items-end justify-between mb-10">
          <div className="flex flex-col gap-1">
            <h2 className="text-headline-lg text-black">THE ESSENTIALS</h2>
            <p className="text-label-sm uppercase tracking-widest text-gray-400">
              Available for nationwide delivery
            </p>
          </div>
          <a
            href="/shop"
            className="text-label-sm uppercase tracking-widest text-black border-b border-black pb-0.5 hover:text-gray-500 hover:border-gray-500 transition-colors whitespace-nowrap"
          >
            View All
          </a>
        </div>

        {/* ── GRID ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {PRODUCTS.map((product) => (
            <Link key={product.flavor} href={SHOP_HREF} className={CARD_CLASSES}>
              {/* IMAGE */}
              <div className={IMAGE_WRAP_CLASSES}>
                <Image
                  src={product.image}
                  alt={product.flavor}
                  width={300}
                  height={400}
                  className={IMAGE_CLASSES}
                />

                <div className={SHADE_CLASSES} />
                <span className={SHADE_TEXT_CLASSES}>View product</span>
                <span className={RIBBON_CLASSES}>Shop now</span>
              </div>

              {/* INFO */}
              <div className="flex flex-col gap-1 px-5 py-4 border-t border-black/10">
                <span className="text-label-sm uppercase tracking-widest text-gray-400">
                  {product.name}
                </span>
                <span className="text-headline-md text-black">{product.flavor}</span>
                <span className="text-label-sm uppercase tracking-widest text-gray-400">
                  {product.size}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}