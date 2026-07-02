  "use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Lottie from "lottie-react";
import Container from "@/Container";
import { Hanken_Grotesk } from "next/font/google";
import Link from "next/link";

const hanken = Hanken_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

// ============================================================
// DATA
// ============================================================

const PRODUCTS = [
  {
    name: "JONES",
    flavor: "BERRY LEMONADE",
    size: "12-PACK / 12OZ GLASS BOTTLES",
    price: "$29.99",
    desc: "Bright, tangy, and refreshingly bold. A summer classic brewed with real berry extracts and a squeeze of lemonade.",
    notes: ["Natural flavors", "No preservatives", "Cane sugar sweetened"],
    image: "/images/BL_12ozBOTTLE_RGB_1024x1024_8ffd2366-6859-40c6-b8d1-df713a652b16-removebg-preview.png",
  },
  {
    name: "JONES",
    flavor: "ROOT BEER",
    size: "12-PACK / 12OZ GLASS BOTTLES",
    price: "$29.99",
    desc: "A smooth, classic root beer with hints of vanilla and anise. The kind your grandparents wished they had.",
    notes: ["Caffeine-free", "Aged vanilla extract", "Cane sugar sweetened"],
    image: "/images/RB_12ozBOTTLE_RGB_1024x1024_85ba6c26-3b04-4458-bfa3-57bb7d34ded3-removebg-preview.png",
  },
  {
    name: "JONES",
    flavor: "GREEN APPLE",
    size: "12-PACK / 12OZ GLASS BOTTLES",
    price: "$29.99",
    desc: "Crisp, tart, and impossibly refreshing. Made with real green apple juice for a flavor that actually tastes like the fruit.",
    notes: ["Real apple juice", "No artificial colors", "Cane sugar sweetened"],
    image: "/images/GA_12ozBOTTLE_RGB_1024x1024_40058c8f-c71d-4d42-a635-37624f0d31ac-removebg-preview.png",
  },
  {
    name: "JONES",
    flavor: "STRAWBERRY LIME",
    size: "12-PACK / 12OZ GLASS BOTTLES",
    price: "$29.99",
    desc: "Ripe strawberries meet zesty lime in a sparkling balance that's equal parts sweet and citrusy.",
    notes: ["Real fruit extracts", "No preservatives", "Cane sugar sweetened"],
    image: "/images/SLIME_12ozBOTTLE_RGB_1024x1024_9846967e-8df6-4c19-829a-a50af4dc3fe6-removebg-preview.png",
  },
  {
    name: "JONES",
    flavor: "ORANGE & CREAM",
    size: "12-PACK / 12OZ GLASS BOTTLES",
    price: "$29.99",
    desc: "The nostalgia of an orange creamsicle, bottled. Velvety smooth with a bright citrus finish.",
    notes: ["Cream base blend", "Natural orange oils", "Cane sugar sweetened"],
    image: "/images/OC_12ozBOTTLE_RGB_1024x1024_1ebaae76-3280-4401-817e-aa5b61ae9ca5-removebg-preview.png",
  },
  {
    name: "JONES",
    flavor: "CREAM SODA",
    size: "12-PACK / 12OZ GLASS BOTTLES",
    price: "$29.99",
    desc: "Pure, velvety cream soda with a delicate vanilla warmth. Simple, indulgent, and endlessly drinkable.",
    notes: ["Madagascar vanilla", "Smooth finish", "Cane sugar sweetened"],
    image: "/images/CREAM_12ozBOTTLE_RGB_1024x1024_6a616cd7-6659-49bb-835c-2bfff120b295-removebg-preview.png",
  },
];

// ============================================================
// SHOP ICON
// ============================================================

const ShopIcon = () => {
  const [animationData, setAnimationData] = useState(null);
  const lottieRef = useRef<any>(null);

  useEffect(() => {
    fetch("/icons/lottieflow-ecommerce-14-2-000000-easey.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, []);

  const handleClick = () => {
    lottieRef.current?.goToAndPlay(0, true);
  };

  if (!animationData) return null;

  return (
    <div
      onClick={handleClick}
      className="flex items-center justify-center w-10 h-10 cursor-pointer"
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        autoplay={false}
        loop={false}
        className="w-8 h-8"
      />
    </div>
  );
};

// ============================================================
// BACK BUTTON (hide on scroll down, show on scroll up — icon + text together)
// ============================================================

function BackButton() {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const accumulated = useRef(0); // فرق تراكمي من آخر مرة اتغير فيها الاتجاه
  const lastDirection = useRef<"up" | "down" | null>(null);
  const ticking = useRef(false);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const diff = currentY - lastScrollY.current;

        // عند القمة دايمًا ظاهر
        if (currentY < 50) {
          setVisible(true);
          accumulated.current = 0;
          lastDirection.current = null;
          lastScrollY.current = currentY;
          ticking.current = false;
          return;
        }

        const direction = diff > 0 ? "down" : diff < 0 ? "up" : lastDirection.current;

        // لو الاتجاه اتغير، صفّر التراكمي وابدأ من جديد
        if (direction !== lastDirection.current) {
          accumulated.current = 0;
          lastDirection.current = direction;
        }

        accumulated.current += Math.abs(diff);

        // نازل وجمعنا مسافة كفاية -> اخفاء
        if (direction === "down" && accumulated.current > 8) {
          setVisible(false);
        }
        // طالع -> اظهار فورًا حتى بحركة بسيطة
        else if (direction === "up") {
          setVisible(true);
        }

        lastScrollY.current = currentY;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed z-50 flex items-center justify-between"
      style={{
        top: "32px",
        left: "clamp(16px, 5vw, 80px)",
        right: "clamp(16px, 5vw, 80px)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-16px)",
        transition: "opacity 0.35s ease, transform 0.35s ease",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      {/* LEFT — back */}
      <Link
        href="/"
        className="inline-flex items-center gap-3"
        style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.08em", color: "#000", textDecoration: "none" }}
      >
        <svg width="24" height="10" viewBox="0 0 24 10" fill="none">
          <line x1="24" y1="5" x2="0" y2="5" stroke="black" strokeWidth="1" />
          <polyline points="7,1 0,5 7,9" fill="none" stroke="black" strokeWidth="1" />
        </svg>
        Return to main
      </Link>

      {/* RIGHT — shop icon */}
      <ShopIcon />
    </div>
  );
}

// ============================================================
// PRODUCT CARD — MOBILE
// ============================================================

function ProductCardMobile({ product }: { product: typeof PRODUCTS[0] }) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 py-10 md:hidden">

      {/* IMAGE */}
      <div
        className="flex items-center justify-center flex-shrink-0"
        style={{ height: "clamp(200px, 45vh, 55vh)" }}
      >
        <Image
          src={product.image}
          alt={product.flavor}
          width={400}
          height={600}
          className="object-contain w-auto h-full"
          style={{ filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.18))" }}
        />
      </div>

      {/* TEXT */}
      <div
        className="flex flex-col items-center text-center w-full"
        style={{ gap: "clamp(6px, 1.2vh, 14px)", maxWidth: "560px" }}
      >
        <span className="uppercase text-gray-400" style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.14em" }}>
          {product.name}
        </span>

        <h2 className="text-black leading-none" style={{ fontSize: "clamp(32px, 8vw, 48px)", fontWeight: 700, letterSpacing: "-0.04em", margin: 0 }}>
          {product.flavor}
        </h2>

        <p className="text-gray-500" style={{ fontSize: "14px", lineHeight: 1.6, margin: 0 }}>
          {product.desc}
        </p>

        {/* PRICE + CTA */}
        <div className="flex items-center justify-center flex-wrap" style={{ gap: "16px", marginTop: "4px" }}>
          <span className="text-black" style={{ fontSize: "24px", fontWeight: 700, letterSpacing: "-0.02em" }}>
            {product.price}
          </span>
          <button
            className="text-white bg-black hover:bg-gray-800 transition-colors uppercase whitespace-nowrap"
            style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", padding: "12px 24px", border: "none", cursor: "pointer" }}
          >
            Add to Cart
          </button>
        </div>
      </div>

    </div>
  );
}

// ============================================================
// PRODUCT CARD — DESKTOP
// ============================================================

function ProductCardDesktop({ product }: { product: typeof PRODUCTS[0] }) {
  return (
    <div className="hidden md:grid h-full items-center" style={{ gridTemplateColumns: "1fr 1fr" }}>

      {/* LEFT — TEXT */}
      <div className="flex flex-col pr-16" style={{ gap: "clamp(12px, 1.5vh, 22px)" }}>
        <span className="uppercase text-gray-400" style={{ fontSize: "clamp(10px, 1vw, 12px)", fontWeight: 600, letterSpacing: "0.12em" }}>
          {product.name}
        </span>

        <h2 className="text-black leading-none" style={{ fontSize: "clamp(40px, 5.5vw, 72px)", fontWeight: 700, letterSpacing: "-0.04em", margin: 0 }}>
          {product.flavor}
        </h2>

        <p className="text-gray-500" style={{ fontSize: "clamp(15px, 1.3vw, 18px)", lineHeight: 1.6, maxWidth: "40ch", margin: 0 }}>
          {product.desc}
        </p>

        {/* NOTES */}
        <ul style={{ display: "flex", flexDirection: "column", gap: "8px", listStyle: "none", padding: 0, margin: 0 }}>
          {product.notes.map((note) => (
            <li key={note} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "clamp(10px, 0.9vw, 12px)", fontWeight: 600, letterSpacing: "0.08em", color: "#aaa", textTransform: "uppercase" }}>
              <span style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "#ccc", flexShrink: 0 }} />
              {note}
            </li>
          ))}
        </ul>

        <span className="uppercase text-gray-400" style={{ fontSize: "clamp(10px, 0.9vw, 12px)", fontWeight: 600, letterSpacing: "0.08em" }}>
          {product.size}
        </span>

        {/* PRICE + CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: "clamp(14px, 2vw, 24px)", flexWrap: "wrap" }}>
          <span className="text-black" style={{ fontSize: "clamp(24px, 2.5vw, 32px)", fontWeight: 700, letterSpacing: "-0.02em" }}>
            {product.price}
          </span>
          <button
            className="text-white bg-black hover:bg-gray-800 transition-colors uppercase whitespace-nowrap"
            style={{ fontSize: "clamp(10px, 0.9vw, 12px)", fontWeight: 600, letterSpacing: "0.08em", padding: "clamp(10px, 1vh, 14px) clamp(20px, 2vw, 28px)", border: "none", cursor: "pointer" }}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* RIGHT — IMAGE */}
      <div className="flex items-center justify-center h-full" style={{ padding: "clamp(24px, 4vh, 60px) 0" }}>
        <Image
          src={product.image}
          alt={product.flavor}
          width={400}
          height={600}
          className="object-contain w-auto"
          style={{ height: "clamp(200px, 60vh, 75vh)", filter: "drop-shadow(0 32px 56px rgba(0,0,0,0.15))" }}
        />
      </div>

    </div>
  );
}

// ============================================================
// PAGE
// ============================================================

export default function ShopPage() {
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        footer { display: none !important; }
        header { display: none !important; }
      `}} />

      <BackButton />

      <main className={hanken.className} style={{ background: "#ffffff" }}>
        {PRODUCTS.map((product, i) => (
          <div
            key={product.flavor}
            ref={(el) => { sectionsRef.current[i] = el; }}
            className="w-full border-b border-black/10"
            style={{ height: "100svh" }}
          >
            <Container className="h-full">
              <ProductCardMobile product={product} />
              <ProductCardDesktop product={product} />
            </Container>
          </div>
        ))}
      </main>
    </>
  );
}