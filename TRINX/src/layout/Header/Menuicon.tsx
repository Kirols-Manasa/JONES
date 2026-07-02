 "use client";

import { useEffect, useRef, useState } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";

/* ╔══════════════════════════════════════════════════════════════════════╗
   ║  📦 ثوابت: أجزاء الـ Lottie JSON بتاعة زرار المنيو (فتح / قفل)         ║
   ╚══════════════════════════════════════════════════════════════════════╝ */

const MENU_OPEN_SEGMENT: [number, number] = [0, 84];
const MENU_CLOSE_SEGMENT: [number, number] = [84, 138];

/* ╔══════════════════════════════════════════════════════════════════════╗
   ║  ☰ أيقونة المنيو (MenuIcon Component)                                 ║
   ║  ─────────────────────────────────────────────────────────────────   ║
   ║  النوع: Lottie Web (تبديل بين Segments حسب الحالة isOpen)             ║
   ║  المصدر: /icons/lottieflow-menu-nav-11-7-000000-easey.json            ║
   ║  السلوك:                                                              ║
   ║    - أول تحميل: بتوقف على الفريم 0 من غير ما تشغل                     ║
   ║    - لما isOpen يتغير: بتشغل OPEN_SEGMENT أو CLOSE_SEGMENT             ║
   ╚══════════════════════════════════════════════════════════════════════╝ */

interface MenuIconProps {
  isOpen?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function MenuIcon({
  isOpen = false,
  onClick,
  className = "",
}: MenuIconProps) {
  const [menuAnimation, setMenuAnimation] = useState(null);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const isFirstRender = useRef(true);
  const lastState = useRef<boolean | null>(null);

  // ── تحميل ملف الـ Lottie JSON مرة واحدة بس ──
  useEffect(() => {
    fetch("/icons/lottieflow-menu-nav-11-7-000000-easey.json")
      .then((res) => res.json())
      .then((data) => setMenuAnimation(data));
  }, []);

  // ── التحكم في تشغيل الـ Segments حسب تغيّر isOpen ──
  useEffect(() => {
    const anim = lottieRef.current;
    if (!anim || !menuAnimation) return;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      anim.goToAndStop(0, true);
      lastState.current = isOpen;
      return;
    }

    if (lastState.current === isOpen) return;
    lastState.current = isOpen;

    anim.stop();

    requestAnimationFrame(() => {
      const instance = lottieRef.current;
      if (!instance) return;

      if (isOpen) {
        instance.playSegments(MENU_OPEN_SEGMENT, true);
      } else {
        instance.playSegments(MENU_CLOSE_SEGMENT, true);
      }
    });
  }, [isOpen, menuAnimation]);

  if (!menuAnimation) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      className={`flex h-10 w-10 cursor-pointer items-center justify-center ${className}`}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={menuAnimation}
        loop={false}
        autoplay={false}
        className="h-10 w-10"
      />
    </button>
  );
}