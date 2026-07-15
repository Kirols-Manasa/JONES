 "use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { LottieRefCurrentProps } from "lottie-react";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

/* ╔══════════════════════════════════════════════════════════════════════╗
   ║  🛍️ أيقونة الشوب (ShopIcon Component)                                ║
   ║  ─────────────────────────────────────────────────────────────────   ║
   ║  النوع: Lottie Web (تشغيل عند الضغط فقط - Click Trigger)              ║
   ║  المصدر: /icons/lottieflow-ecommerce-14-2-000000-easey.json           ║
   ║  السلوك: بتتحمل الانيميشن أول ما الكومبوننت يتركب، وبتتشغل عند الكليك  ║
   ╚══════════════════════════════════════════════════════════════════════╝ */

export default function ShopIcon() {
  const [animationData, setAnimationData] = useState(null);
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    fetch("/icons/lottieflow-ecommerce-14-2-000000-easey.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, []);

  if (!animationData) return null;

  return (
    <div
      onClick={() => lottieRef.current?.goToAndPlay(0, true)}
      className="flex h-10 w-10 cursor-pointer items-center justify-center"
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        autoplay={false}
        loop={false}
        className="h-8 w-8"
      />
    </div>
  );
}