 "use client";

import Container from "@/Container";

export default function Nutrition() {
  return (
    <>
      <div className="w-full h-[1px] bg-black/10" />

      <section className="w-full bg-white py-12 sm:py-16">
        <Container>

          <div className="grid grid-cols-4 divide-x divide-black/10 text-center w-full overflow-hidden">

            {/* ITEM 1 */}
            <div className="flex flex-col items-center justify-center gap-2 min-h-[110px] px-2">
              <span className="text-[32px] md:text-headline-lg text-black leading-none tracking-tight">
                6
              </span>
              <span className="text-label-sm uppercase tracking-widest text-gray-400 leading-tight">
                Core Flavors
              </span>
            </div>

            {/* ITEM 2 */}
            <div className="flex flex-col items-center justify-center gap-2 min-h-[110px] px-2">
              <span className="text-[32px] md:text-headline-lg text-black leading-none tracking-tight">
                100%
              </span>
              <span className="text-label-sm uppercase tracking-widest text-gray-400 leading-tight">
                Cane Sugar
              </span>
            </div>

            {/* ITEM 3 */}
            <div className="flex flex-col items-center justify-center gap-2 min-h-[110px] px-2">
              <span className="text-[32px] md:text-headline-lg text-black leading-none tracking-tight">
                355
              </span>
              <span className="text-label-sm uppercase tracking-widest text-gray-400 leading-tight">
                ML Per Bottle
              </span>
            </div>

            {/* ITEM 4 */}
            <div className="flex flex-col items-center justify-center gap-2 min-h-[110px] px-2">
              <span className="text-[32px] md:text-headline-lg text-black leading-none tracking-tight">
                0g
              </span>
              <span className="text-label-sm uppercase tracking-widest text-gray-400 leading-tight">
                Total Fat
              </span>
            </div>

          </div>

        </Container>
      </section>

      <div className="w-full h-[1px] bg-black/10" />
    </>
  );
}