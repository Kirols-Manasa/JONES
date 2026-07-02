 "use client";

import Container from "@/Container";

const INGREDIENTS = [
  {
    title: "PURE CANE SUGAR",
    body: "The original sweet stuff. No high-fructose corn syrup, just pure natural sweetness for a cleaner, crisper finish.",
  },
  {
    title: "NATURAL EXTRACTS",
    body: "Premium oils and essences extracted directly from fruits and spices to give our sodas their legendary, bold character.",
  },
  {
    title: "FILTERED WATER",
    body: "Crystal clear, triple-filtered water provides the perfect canvas for our flavor profiles to shine without interference.",
  },
  {
    title: "CO2 BUBBLES",
    body: "Precisely calibrated carbonation levels to ensure that signature Jones tingle and a refreshing, sharp mouthfeel.",
  },
];

export default function Formula() {
  return (
    <section className="w-full bg-white py-16 md:py-20">
      <Container>
        {/* HEADER */}
        <div className="flex flex-col gap-2 mb-10 md:mb-14">
          <span className="text-label-sm uppercase tracking-widest text-gray-400">
            What's Inside
          </span>

          <h2 className="text-display text-black leading-tight">
            SIMPLE. REAL.
          </h2>
        </div>

        {/* LIST */}
        <div className="flex flex-col">
          {INGREDIENTS.map((item, i) => (
            <div
              key={i}
              className="
                group
                grid grid-cols-1
                md:grid-cols-12
                gap-6 md:gap-10
                py-7 md:py-9
                border-t border-black/10
                items-start
              "
            >
              {/* LEFT */}
              <div className="md:col-span-5 flex items-start gap-4">
                <span
                  className="
                    block w-[3px] h-7 mt-1
                    bg-black
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-300
                    shrink-0
                  "
                />

                <span className="text-headline-md text-black leading-snug">
                  {item.title}
                </span>
              </div>

              {/* RIGHT */}
              <div className="md:col-span-7">
                <p className="text-body-md text-gray-500 max-w-prose leading-relaxed">
                  {item.body}
                </p>
              </div>
            </div>
          ))}

          <div className="border-t border-black/10" />
        </div>
      </Container>
    </section>
  );
}