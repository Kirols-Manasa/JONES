 import { Hanken_Grotesk } from "next/font/google";
import Container from "@/Container";

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function Footer() {
  return (
    <footer className={`${hankenGrotesk.className} bg-[#f9f6f0] border-t border-[#e0dbd1]`}>
      <Container className="pt-[72px] pb-10">

        <div className="text-[clamp(64px,12vw,150px)] font-bold tracking-[0.18em] text-[#1a1a1a] leading-none mb-12">
          JONES
        </div>

        <div className="h-px bg-[#e0dbd1] mb-7" />

        <div className="flex items-center justify-between">
          <span className="text-[11px] text-[#cccccc] tracking-[0.12em] uppercase">
            Est. 2024
          </span>
          <nav className="flex gap-7">
            {["Shop", "About", "Contact", "Privacy"].map((link) => (
              <span
                key={link}
                className="text-xs text-[#aaaaaa] tracking-[0.08em] hover:text-[#1a1a1a] transition-colors duration-200 cursor-pointer"
              >
                {link}
              </span>
            ))}
          </nav>
        </div>

      </Container>
    </footer>
  );
}