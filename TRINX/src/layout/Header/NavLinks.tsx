 "use client";

import type { RefObject } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { gsap } from "gsap";

/* =========================================================
   Types
========================================================= */

interface NavLink {
  name: string;
  href: string;
  icon?: string;
}

interface MobileNavLinksProps {
  linksRef: RefObject<(HTMLLIElement | null)[]>;
  onClose?: () => void;
}

/* =========================================================
   Navigation Data
========================================================= */

const NAV_LINKS: NavLink[] = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Shop",
    href: "/shop",
  },
  {
    name: "Our Story",
    href: "/#our-story",
  },
];

/* =========================================================
   Desktop Nav Entrance Animation Settings
   "نزول حقيقي من برة الفريم" — نفس منطق اللوجو، كل لينك
   بينزل من فوق حافة الهيدر من غير blur، وبيهبط بعد اللوجو
   بشوية عشان يحصل تتابع (choreography) بين الاتنين.
========================================================= */

const NAV_ENTRANCE_FROM = {
  y: -60,
  opacity: 0,
};

const NAV_ENTRANCE_TO = {
  y: 0,
  opacity: 1,
  duration: 0.6,
  ease: "power3.out",
  stagger: 0.08,
};

// وقت البداية بالنسبة لبداية أنيميشن اللوجو (Logo.tsx)
// خليها أكبر من صفر عشان اللينكات تنزل بعد اللوجو بلحظة بسيطة
const NAV_ENTRANCE_DELAY = 0.55;

/* =========================================================
   Smooth Scroll Helpers
========================================================= */

function scrollToId(id: string) {
  let attempts = 0;
  const tryScroll = () => {
    const target = document.getElementById(id);
    if (target) {
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(target, {
          offset: 0,
          duration: 1.4,
          easing: (t: number) => 1 - Math.pow(1 - t, 2),
        });
      } else {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }
    attempts += 1;
    if (attempts < 20) {
      requestAnimationFrame(tryScroll);
    }
  };
  tryScroll();
}

function scrollToTop() {
  const lenis = (window as any).lenis;
  if (lenis) {
    lenis.scrollTo(0, {
      duration: 1.4,
      easing: (t: number) => 1 - Math.pow(1 - t, 2),
    });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function useSmoothAnchorNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  return (e: React.MouseEvent<HTMLAnchorElement>, href: string, onClose?: () => void) => {
    const hashIndex = href.indexOf("#");

    if (hashIndex === -1) {
      onClose?.();

      if (href === "/" && pathname === "/") {
        e.preventDefault();
        scrollToTop();
      }
      return;
    }

    const targetPath = href.slice(0, hashIndex) || "/";
    const id = href.slice(hashIndex + 1);

    e.preventDefault();
    onClose?.();

    if (pathname === targetPath) {
      scrollToId(id);
    } else {
      router.push(targetPath);
      setTimeout(() => scrollToId(id), 350);
    }
  };
}

/* =========================================================
   Desktop Classes
========================================================= */

const DESKTOP_NAV_CLASSES = "hidden md:flex items-center gap-6 lg:gap-14";

const DESKTOP_LINK_CLASSES = [
  "group",
  "relative",
  "inline-flex",
  "items-center",
  "overflow-hidden",
  "px-1",
  "py-2",
  "text-sm",
  "font-medium",
  "uppercase",
  "tracking-[0.18em]",
  "text-gray-700",
  "hover:text-black",
  "whitespace-nowrap",
  "transition-colors",
  "duration-200",
].join(" ");

const DESKTOP_LINK_TEXT_CLASSES = "relative z-10 inline-block";

const DESKTOP_UNDERLINE_CLASSES = [
  "absolute",
  "bottom-1",
  "left-0",
  "h-px",
  "w-full",
  "origin-left",
  "bg-gradient-to-r",
  "from-transparent",
  "via-black",
  "to-transparent",
].join(" ");

const DESKTOP_SHINE_CLASSES = [
  "pointer-events-none",
  "absolute",
  "inset-y-0",
  "left-0",
  "w-1/2",
  "bg-gradient-to-r",
  "from-transparent",
  "via-black/10",
  "to-transparent",
  "blur-sm",
].join(" ");

const DESKTOP_DOT_CLASSES = [
  "absolute",
  "-bottom-0.5",
  "left-1/2",
  "h-1",
  "w-1",
  "-translate-x-1/2",
  "rounded-full",
  "bg-black",
  "shadow-[0_0_10px_rgba(0,0,0,0.35)]",
].join(" ");

/* =========================================================
   Mobile Classes
========================================================= */

const MOBILE_NAV_CLASSES = "flex-1 flex flex-col justify-center py-10";

const MOBILE_LIST_CLASSES = "space-y-5 group/list";

const MOBILE_LIST_ITEM_CLASSES = [
  "overflow-hidden",
  "transition-opacity",
  "duration-300",
  "group-hover/list:opacity-30",
  "hover:!opacity-100",
].join(" ");

const MOBILE_LINK_CLASSES = ["group", "flex", "items-center", "gap-6", "text-black"].join(" ");

const MOBILE_LINK_TEXT_CLASSES = [
  "font-black",
  "text-[clamp(2.5rem,9vw,5.5rem)]",
  "uppercase",
  "tracking-tighter",
  "leading-none",
  "whitespace-nowrap",
  "relative",
  "inline-block",
  "after:absolute",
  "after:bottom-0",
  "after:left-0",
  "after:h-[3px]",
  "after:w-full",
  "after:bg-black",
  "after:scale-x-0",
  "after:origin-left",
  "after:transition-transform",
  "after:duration-300",
  "after:ease-out",
  "group-hover:after:scale-x-1",
].join(" ");

const MOBILE_ICON_CLASSES = [
  "material-symbols-outlined",
  "text-4xl",
  "opacity-0",
  "group-hover:opacity-100",
  "transition-opacity",
  "duration-300",
].join(" ");

/* =========================================================
   Animation Settings (hover)
========================================================= */

const DESKTOP_LINK_VARIANTS = {
  rest: {
    y: 0,
  },
  hover: {
    y: -2,
  },
  tap: {
    y: 0,
    scale: 0.98,
  },
};

const DESKTOP_LINK_TRANSITION = {
  type: "spring",
  stiffness: 420,
  damping: 28,
  mass: 0.6,
} as const;

const DESKTOP_UNDERLINE_VARIANTS = {
  rest: {
    scaleX: 0,
    opacity: 0,
  },
  hover: {
    scaleX: 1,
    opacity: 1,
  },
};

const DESKTOP_UNDERLINE_TRANSITION = {
  duration: 0.42,
  ease: [0.16, 1, 0.3, 1],
} as const;

const DESKTOP_SHINE_VARIANTS = {
  rest: {
    x: "-140%",
    opacity: 0,
  },
  hover: {
    x: "140%",
    opacity: 1,
  },
};

const DESKTOP_SHINE_TRANSITION = {
  duration: 0.65,
  ease: [0.19, 1, 0.22, 1],
} as const;

const DESKTOP_DOT_VARIANTS = {
  rest: {
    opacity: 0,
    scale: 0.75,
  },
  hover: {
    opacity: 1,
    scale: 1,
  },
};

const DESKTOP_DOT_TRANSITION = {
  duration: 0.28,
  ease: "easeOut",
  delay: 0.06,
} as const;

/* =========================================================
   Desktop Nav Link Item
========================================================= */

const MotionLink = motion(Link);

function DesktopNavLink({
  link,
  onAnchorClick,
  textRef,
}: {
  link: NavLink;
  onAnchorClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  textRef: (el: HTMLSpanElement | null) => void;
}) {
  return (
    <MotionLink
      href={link.href}
      onClick={(e) => onAnchorClick(e, link.href)}
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileTap="tap"
      variants={DESKTOP_LINK_VARIANTS}
      transition={DESKTOP_LINK_TRANSITION}
      className={DESKTOP_LINK_CLASSES}
    >
      <span ref={textRef} className={DESKTOP_LINK_TEXT_CLASSES}>
        {link.name}
      </span>

      <motion.span
        variants={DESKTOP_UNDERLINE_VARIANTS}
        transition={DESKTOP_UNDERLINE_TRANSITION}
        className={DESKTOP_UNDERLINE_CLASSES}
      />

      <motion.span
        variants={DESKTOP_SHINE_VARIANTS}
        transition={DESKTOP_SHINE_TRANSITION}
        className={DESKTOP_SHINE_CLASSES}
      />

      <motion.span
        variants={DESKTOP_DOT_VARIANTS}
        transition={DESKTOP_DOT_TRANSITION}
        className={DESKTOP_DOT_CLASSES}
      />
    </MotionLink>
  );
}

/* =========================================================
   Mobile Nav Link Item
========================================================= */

function MobileNavLinkItem({
  link,
  index,
  linksRef,
  onClose,
  onAnchorClick,
}: {
  link: NavLink;
  index: number;
  linksRef: RefObject<(HTMLLIElement | null)[]>;
  onClose?: () => void;
  onAnchorClick: (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    onClose?: () => void
  ) => void;
}) {
  return (
    <li
      ref={(el) => {
        linksRef.current[index] = el;
      }}
      className={MOBILE_LIST_ITEM_CLASSES}
      style={{ opacity: 0 }}
    >
      <Link
        href={link.href}
        onClick={(e) => onAnchorClick(e, link.href, onClose)}
        className={MOBILE_LINK_CLASSES}
      >
        <span className={`${MOBILE_LINK_TEXT_CLASSES} mobile-link-text`}>{link.name}</span>

        <span className={MOBILE_ICON_CLASSES}>{link.icon}</span>
      </Link>
    </li>
  );
}

/* =========================================================
   Desktop Navigation
========================================================= */

export function NavLinks() {
  const handleAnchorClick = useSmoothAnchorNavigation();
  const textRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const els = textRefs.current.filter(Boolean) as HTMLSpanElement[];
    if (!els.length) return;

    const ctx = gsap.context(() => {
      gsap.set(els, NAV_ENTRANCE_FROM);
      gsap.to(els, {
        ...NAV_ENTRANCE_TO,
        delay: NAV_ENTRANCE_DELAY,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <nav className={DESKTOP_NAV_CLASSES}>
      {NAV_LINKS.map((link, i) => (
        <DesktopNavLink
          key={link.href}
          link={link}
          onAnchorClick={handleAnchorClick}
          textRef={(el) => {
            textRefs.current[i] = el;
          }}
        />
      ))}
    </nav>
  );
}

/* =========================================================
   Mobile Navigation
========================================================= */

export function MobileNavLinks({ linksRef, onClose }: MobileNavLinksProps) {
  const handleAnchorClick = useSmoothAnchorNavigation();

  return (
    <nav className={MOBILE_NAV_CLASSES}>
      <ul className={MOBILE_LIST_CLASSES}>
        {NAV_LINKS.map((link, index) => (
          <MobileNavLinkItem
            key={link.href}
            link={link}
            index={index}
            linksRef={linksRef}
            onClose={onClose}
            onAnchorClick={handleAnchorClick}
          />
        ))}
      </ul>
    </nav>
  );
}