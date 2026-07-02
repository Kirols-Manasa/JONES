 "use client";

import { useRef, useState } from "react";

import Container from "@/Container";
import { useHeaderScroll } from "./animations/useHeaderScroll";
import Logo from "./Logo";
import MenuIcon from "./Menuicon";
import MobileMenu from "./Mobilemenu";
import { NavLinks } from "./NavLinks";
import ShopIcon from "./Shopicon";

/* ╔══════════════════════════════════════════════════════════════════════╗
   ║  🏠 الهيدر الرئيسي (Header Component) — نقطة التجميع فقط               ║
   ║  ─────────────────────────────────────────────────────────────────   ║
   ║  الملف ده مفيهوش أي منطق انيميشن أو لوجيك تفصيلي.                      ║
   ║  هو بس بيجمع الكومبوننتس الجاهزة من الملفات التانية:                  ║
   ║    - Logo.tsx            → اللوجو                                    ║
   ║    - NavLinks.tsx        → روابط النافيجيشن (ديسكتوب)                 ║
   ║    - ShopIcon.tsx        → أيقونة الكارت                              ║
   ║    - MenuIcon.tsx        → زرار فتح/قفل المنيو (موبايل)               ║
   ║    - MobileMenu.tsx      → المنيو الكامل بتاع الموبايل                ║
   ║    - animations/useHeaderScroll.ts → انيميشن الهيدر عند السكرول        ║
   ╚══════════════════════════════════════════════════════════════════════╝ */

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useHeaderScroll(headerRef);

  return (
    <>
      <header
        ref={headerRef}
        className="fixed left-0 right-0 top-0 z-50 w-full border-b border-white/15 bg-white/[0.08] shadow-[0_1px_0_rgba(255,255,255,0.35)_inset,0_10px_40px_rgba(15,23,42,0.06)] backdrop-blur-[28px] backdrop-brightness-[1.15] backdrop-saturate-[200%]"
      >
        <Container>
          <div className="grid h-24 grid-cols-3 items-center">
            {/* ── العمود 1: اللوجو (نسخة الديسكتوب) ── */}
            <div className="flex items-center justify-self-start">
              <div className="hidden md:block">
                <Logo animate={false} />
              </div>
            </div>

            {/* ── العمود 2: اللوجو (نسخة الموبايل) + روابط النافيجيشن ── */}
            <div className="justify-self-center">
              <div className="md:hidden">
                <Logo animate={false} />
              </div>

              <NavLinks />
            </div>

            {/* ── العمود 3: أيقونة الشوب + زرار المنيو (موبايل بس) ── */}
            <div className="flex items-center justify-self-end gap-3">
              <ShopIcon />

              <div className="md:hidden">
                <MenuIcon
                  isOpen={isMobileMenuOpen}
                  onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                />
              </div>
            </div>
          </div>
        </Container>
      </header>

      {/* ── المنيو الكامل بتاع الموبايل (بيتفتح فوق كل حاجة) ── */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}