 "use client";

import Image from "next/image";
import Link from "next/link";
import Container from "@/Container";

export default function Culture() {
  return (
    <section className="w-full bg-black py-20">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-stretch">

          {/* IMAGE */}
          <div className="relative overflow-hidden group">
            <Image
              src="/images/photo.webp"
              alt="Jones Soda Community"
              width={700}
              height={800}
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 50vw"
              className="w-full h-[400px] md:h-[550px] object-cover transition-all duration-700 grayscale hover:grayscale-0 [@media(hover:none)]:grayscale-0"
               style={{ aspectRatio: "700/800" }}
            />
          </div>

          {/* TEXT */}
          <div className="flex flex-col gap-8 py-6 md:py-10 justify-center">

            {/* TITLE - 2 LINES FIXED */}
            <h2 className="text-display text-white italic max-w-[12ch]">
              THE PHOTO ON THE LABEL<br />
              COULD BE YOURS.
            </h2>

            <div className="flex flex-col gap-8">

              {/* PARAGRAPH - 2 LINES + controlled break */}
              <p className="text-body-lg text-white/70 italic max-w-[36ch]">
                Since day one, we've invited you to submit your photos. Thousands of stories
                have lived on our labels, traveling from hands to hands<br />
                across the globe.
              </p>

              <div>
                <Link
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="inline-flex items-center text-label-sm uppercase tracking-widest text-white border-b border-white pb-1 hover:text-white/60 hover:border-white/60 transition-colors cursor-pointer"
                >
                  Submit Your Photo
                </Link>
              </div>

            </div>

          </div>

        </div>
      </Container>
    </section>
  );
}