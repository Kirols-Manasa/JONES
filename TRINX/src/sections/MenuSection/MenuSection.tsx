"use client";

import Image from "next/image";
import Container from "@/Container";

const PRODUCTS = [
  {
    name: "JONES",
    flavor: "BERRY LEMONADE",
    size: "12-PACK / 12OZ GLASS BOTTLES",
    image: "/images/BL_12ozBOTTLE_RGB_1024x1024_8ffd2366-6859-40c6-b8d1-df713a652b16-removebg-preview.png",
  },
  {
    name: "JONES",
    flavor: "ROOT BEER",
    size: "12-PACK / 12OZ GLASS BOTTLES",
    image: "/images/RB_12ozBOTTLE_RGB_1024x1024_85ba6c26-3b04-4458-bfa3-57bb7d34ded3-removebg-preview.png",
  },
  {
    name: "JONES",
    flavor: "GREEN APPLE",
    size: "12-PACK / 12OZ GLASS BOTTLES",
    image: "/images/GA_12ozBOTTLE_RGB_1024x1024_40058c8f-c71d-4d42-a635-37624f0d31ac-removebg-preview.png",
  },
  {
    name: "JONES",
    flavor: "STRAWBERRY LIME",
    size: "12-PACK / 12OZ GLASS BOTTLES",
    image: "/images/SLIME_12ozBOTTLE_RGB_1024x1024_9846967e-8df6-4c19-829a-a50af4dc3fe6-removebg-preview.png",
  },
  {
    name: "JONES",
    flavor: "ORANGE & CREAM",
    size: "12-PACK / 12OZ GLASS BOTTLES",
    image: "/images/OC_12ozBOTTLE_RGB_1024x1024_1ebaae76-3280-4401-817e-aa5b61ae9ca5-removebg-preview.png",
  },
  {
    name: "JONES",
    flavor: "CREAM SODA",
    size: "12-PACK / 12OZ GLASS BOTTLES",
    image: "/images/CREAM_12ozBOTTLE_RGB_1024x1024_6a616cd7-6659-49bb-835c-2bfff120b295-removebg-preview.png",
  },
];

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
            <div
              key={product.flavor}
               className="group flex flex-col bg-white border border-gray-400 overflow-hidden cursor-pointer hover:border-black transition-colors duration-300"
            >
              {/* IMAGE */}
               <div className="relative flex items-center justify-center h-[60vh] md:h-[420px] p-6">
                <Image
                  src={product.image}
                  alt={product.flavor}
                  width={300}
                  height={400}
                  className="object-contain h-full w-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)] group-hover:scale-105 transition-transform duration-500"
                />
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
            </div>
          ))}
        </div>

      </Container>
    </section>
  );
}