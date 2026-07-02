 "use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

import Logo from "./Logo";
import { MobileNavLinks } from "./NavLinks";

/* ╔══════════════════════════════════════════════════════════════════════╗
   ║  🎬 انيميشن فتح المنيو الموبايل (Mobile Menu - Open Animation)        ║
   ║  ─────────────────────────────────────────────────────────────────   ║
   ║  بيشتغل على: الـ overlay + روابط المنيو + الفوتر                      ║
   ║  الترتيب: overlay fade-in → links stagger-up → footer fade-in         ║
   ╚══════════════════════════════════════════════════════════════════════╝ */

 function animateMobileMenuOpen(
  overlay: HTMLDivElement,
  links: HTMLElement[],
  footer: HTMLElement,
  onComplete: () => void
) {
  gsap.set(overlay, { display: "flex" });
  gsap.set(overlay, { opacity: 0 });

  // كل لينك هياخد الـ span بتاع النص جواه عشان نعمل عليه clip-path
  const textSpans = links
    .map((link) => link.querySelector(".mobile-link-text"))
    .filter(Boolean) as HTMLElement[];

  gsap.set(textSpans, { clipPath: "inset(0 100% 0 0)" }); // مخفي بالكامل من اليمين
  gsap.set(links, { opacity: 1 }); // اللي بره الـ clip بيبقى ظاهر على طول
  gsap.set(footer, { opacity: 0, y: 8 });

  gsap
    .timeline({ onComplete })
    .to(overlay, {
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    })
    .to(
      textSpans,
      {
        clipPath: "inset(0 0% 0 0)", // بيتكشف زي الكتابة
        duration: 0.55,
        stagger: 0.07,
        ease: "power3.out",
      },
      "-=0.1"
    )
    .fromTo(
      footer,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
      "-=0.2"
    );
}

/* ╔══════════════════════════════════════════════════════════════════════╗
   ║  🎬 انيميشن قفل المنيو الموبايل (Mobile Menu - Close Animation)       ║
   ║  ─────────────────────────────────────────────────────────────────   ║
   ║  بيشتغل على: الروابط (بترتيب معكوس) + الـ overlay                     ║
   ║  الترتيب: links fade-out reversed → overlay fade-out                  ║
   ╚══════════════════════════════════════════════════════════════════════╝ */
 function animateMobileMenuClose(
  overlay: HTMLDivElement,
  links: HTMLElement[],
  onComplete: () => void
) {
  const textSpans = links
    .map((link) => link.querySelector(".mobile-link-text"))
    .filter(Boolean) as HTMLElement[];

  gsap
    .timeline({ onComplete })
    .to([...textSpans].reverse(), {
      clipPath: "inset(0 0 0 100%)", // بيتغطى من الشمال
      duration: 0.2,
      stagger: 0.03,
      ease: "power2.in",
    })
    .to(
      overlay,
      { opacity: 0, duration: 0.25, ease: "power2.in" },
      "-=0.1"
    );
}
/* ╔══════════════════════════════════════════════════════════════════════╗
   ║  📱 المنيو الكامل بتاع الموبايل (MobileMenu Component)                 ║
   ║  ─────────────────────────────────────────────────────────────────   ║
   ║  المسؤوليات:                                                          ║
   ║    - منع scroll الصفحة لما يكون مفتوح                                 ║
   ║    - تشغيل animateMobileMenuOpen / animateMobileMenuClose حسب الحالة  ║
   ║    - عرض: Logo + زرار Close + الروابط (MobileNavLinks) + الفوتر       ║
   ╚══════════════════════════════════════════════════════════════════════╝ */

interface MobileMenuProps {
  isOpen: boolean;
  onClose?: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLLIElement | null)[]>([]);
  const footerRef = useRef<HTMLElement>(null);
  const isAnimatingRef = useRef(false);

  // ── منع سكرول الصفحة وراء المنيو وهو مفتوح ──
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // ── تشغيل انيميشن الفتح / القفل حسب حالة isOpen ──
  useEffect(() => {
    const overlay = overlayRef.current;
    const links = linksRef.current.filter(Boolean) as HTMLElement[];
    const footer = footerRef.current;

    if (!overlay || !footer) return;

    gsap.killTweensOf([overlay, links, footer]);

    if (isOpen) {
      if (isAnimatingRef.current) return;

      isAnimatingRef.current = true;

      animateMobileMenuOpen(overlay, links, footer, () => {
        isAnimatingRef.current = false;
      });
    } else {
      animateMobileMenuClose(overlay, links, () => {
        gsap.set(overlay, { display: "none" });
        isAnimatingRef.current = false;
      });
    }
  }, [isOpen]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-40 hidden flex-col justify-between overflow-hidden bg-white/[0.08] px-6 pb-10 pt-8 shadow-[0_1px_0_rgba(255,255,255,0.35)_inset,0_10px_40px_rgba(15,23,42,0.06)] backdrop-blur-[28px] backdrop-brightness-[1.15] backdrop-saturate-[200%] md:px-16"
      style={{ opacity: 0 }}
    >
      {/* ── هيدر المنيو: اللوجو + زرار الإغلاق ── */}
      <header className="flex w-full items-center justify-between">
        <Logo animate={false} />

        <button
          type="button"
          onClick={onClose}
          className="group flex items-center gap-2 active:scale-95 transition-transform"
        >
          <span className="text-xs uppercase tracking-widest text-gray-500 group-hover:text-black">
            Close
          </span>

          <div className="flex h-11 w-11 items-center justify-center border border-gray-300 transition-colors group-hover:border-black">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </div>
        </button>
      </header>

      {/* ── روابط المنيو (الانيميشن بتاعهم فوق في قسم 🎬) ── */}
      <MobileNavLinks linksRef={linksRef} onClose={onClose} />

      {/* ── فوتر المنيو: زرار الكارت ── */}
      <footer
        ref={footerRef}
        className="grid w-full grid-cols-2 gap-6 border-t border-gray-200 pt-8 md:grid-cols-3"
        style={{ opacity: 0 }}
      >
        <div className="flex flex-col gap-4 md:flex-row md:justify-center md:gap-10" />

        <div className="flex items-end justify-end">
          <button
            type="button"
            className="bg-black px-6 py-3 text-[10px] uppercase tracking-widest text-white"
          >
            Cart (0)
          </button>
        </div>
      </footer>
    </div>
  );
}