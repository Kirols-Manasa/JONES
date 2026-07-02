 // components/LightRouteTransition/LightRouteTransition.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/* ------------------------------------------------------------------ */
/*  Lightweight route transition — pure vanilla JS, no extra libs.    */
/*  Uses requestAnimationFrame + CSS transitions only.                */
/*  - Overlay fades in (covers screen)                                */
/*  - Old content fades/slides out                                    */
/*  - New content fades/slides in once overlay clears                 */
/*                                                                     */
/*  ملاحظة مهمة: transform على هذا الـ wrapper بيكسر containing block */
/*  الخاص بأي عنصر position:fixed جواه (زي هيدر صفحة الشوب). لذلك     */
/*  transform بيتفعّل بس أثناء الترانزيشن نفسه، وبعدها بيترجع "none"  */
/*  عشان أي position:fixed جوه المحتوى يشتغل صح بالنسبة للشاشة.       */
/* ------------------------------------------------------------------ */

 const OVERLAY_IN_MS = 150;
const OVERLAY_HOLD_MS = 40;
const OVERLAY_OUT_MS = 150;
const CONTENT_MS = 200;

export default function LightRouteTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const prevPathRef = useRef(pathname);
  const [displayedChildren, setDisplayedChildren] = useState(children);
  const timeoutsRef = useRef<number[]>([]);

  const clearTimers = () => {
    timeoutsRef.current.forEach((id) => window.clearTimeout(id));
    timeoutsRef.current = [];
  };

  useEffect(() => {
    if (prevPathRef.current === pathname) {
      // first mount, just sync content
      setDisplayedChildren(children);
      return;
    }
    prevPathRef.current = pathname;

    const overlay = overlayRef.current;
    const content = contentRef.current;
    if (!overlay || !content) {
      setDisplayedChildren(children);
      return;
    }

    clearTimers();

    // 1) overlay fades/scales in to cover the screen
    overlay.style.pointerEvents = "auto";
    overlay.style.transition = `opacity ${OVERLAY_IN_MS}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${OVERLAY_IN_MS}ms cubic-bezier(0.16, 1, 0.3, 1)`;
    requestAnimationFrame(() => {
      overlay.style.opacity = "1";
      overlay.style.transform = "scale(1)";
    });

    // 2) old content fades out slightly, in parallel
    content.style.transition = `opacity 200ms ease-out, transform 200ms ease-out`;
    content.style.opacity = "0";
    content.style.transform = "translateY(-8px)";

    const t1 = window.setTimeout(() => {
      // swap content while fully covered
      setDisplayedChildren(children);

      const t2 = window.setTimeout(() => {
        // 3) overlay recedes
        overlay.style.transition = `opacity ${OVERLAY_OUT_MS}ms cubic-bezier(0.7, 0, 0.84, 0), transform ${OVERLAY_OUT_MS}ms cubic-bezier(0.7, 0, 0.84, 0)`;
        overlay.style.opacity = "0";
        overlay.style.transform = "scale(1.04)";

        // 4) new content fades/slides in
        content.style.transition = `opacity ${CONTENT_MS}ms cubic-bezier(0.34, 1.56, 0.64, 1), transform ${CONTENT_MS}ms cubic-bezier(0.34, 1.56, 0.64, 1)`;
        requestAnimationFrame(() => {
          content.style.opacity = "1";
          content.style.transform = "translateY(0)";
        });

        const t3 = window.setTimeout(() => {
          overlay.style.pointerEvents = "none";

          // مهم: نشيل الـ transform تمامًا بعد ما الترانزيشن يخلص
          // عشان position:fixed لأي عنصر جوه المحتوى (زي هيدر الشوب)
          // يرجع يشتغل بالنسبة للشاشة صح، ومش بالنسبة لهذا الـ div.
          content.style.transform = "none";
        }, OVERLAY_OUT_MS);
        timeoutsRef.current.push(t3);
      }, OVERLAY_HOLD_MS);
      timeoutsRef.current.push(t2);
    }, OVERLAY_IN_MS);
    timeoutsRef.current.push(t1);

    return () => clearTimers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      <div
        ref={overlayRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          background:
            "linear-gradient(180deg, #ffffff 0%, #f3f8ff 55%, #dcecff 100%)",
          opacity: 0,
          transform: "scale(0.98)",
          pointerEvents: "none",
        }}
      />
      {/* لاحظ: مفيش transform هنا في الحالة الافتراضية، فقط أثناء الترانزيشن */}
      <div ref={contentRef} style={{ opacity: 1 }}>
        {displayedChildren}
      </div>
    </>
  );
}