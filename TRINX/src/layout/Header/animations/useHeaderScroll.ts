 import { useEffect, useRef } from "react";

export function useHeaderScroll(headerRef: React.RefObject<HTMLElement | null>) {
  const lastScrollY = useRef(0);
  const isHidden    = useRef(false);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    header.style.transition = "transform 0.5s cubic-bezier(0.77, 0, 0.175, 1)";

    const handleScroll = () => {
      const currentY  = window.scrollY;
      const direction = currentY > lastScrollY.current ? "down" : "up";

      if (direction === "down" && currentY > 60 && !isHidden.current) {
        isHidden.current = true;
        header.style.transform = "translateY(-100%)";
      }

      if (direction === "up" && isHidden.current) {
        isHidden.current = false;
        header.style.transform = "translateY(0%)";
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headerRef]);
}