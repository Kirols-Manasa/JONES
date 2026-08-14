 "use client";

import { useEffect, useRef } from "react";
import Container from "@/Container";
// ⚡ لاحظ: مفيش import ثابت لـ gsap/ScrollTrigger هنا خالص.
// السبب: الاستدعاء الثابت (import gsap from "gsap") كان بيحمّل المكتبة
// كاملة جوه الـ JS bundle الأساسي للصفحة وقت التحميل الأول، حتى قبل
// ما المستخدم يعمل سكرول أو يحتاج أي أنيميشن. ده كان بيزود TBT ووقت
// الـ hydration ويأثر على سرعة الموقع كله مش بس السكشن ده.
// الحل: تحميلها ديناميكيًا (dynamic import) جوه useEffect، فتتحمل في
// chunk منفصل بعد ما الصفحة تترندر، من غير ما تعطل أي حاجة تانية.

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
  const videoSectionRef = useRef<HTMLElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const listSectionRef = useRef<HTMLElement>(null);
  const headerEyebrowRef = useRef<HTMLSpanElement>(null);
  const headerTitleRef = useRef<HTMLHeadingElement>(null);
  const rowRefs = useRef<Array<HTMLDivElement | null>>([]);
  const barRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const titleRefs = useRef<Array<HTMLSpanElement | null>>([]);

  // ⚡ مرجع بنخزن فيه instance بتاع gsap بعد ما يتحمل ديناميكيًا،
  // عشان نقدر نستخدمه في hover handlers برة الـ useEffect الأساسي.
  // (النوع any عمدًا هنا عشان نتجنب استدعاء أي type من مكتبة gsap
  // بشكل ثابت في وقت الـ build، فمفيش أي إضافة لحجم الكود).
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gsapRef = useRef<any>(null);

  const titleText = "SIMPLE. REAL.";

  useEffect(() => {
    let isMounted = true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ctx: any;

    (async () => {
      // ⚡ تحميل GSAP و ScrollTrigger ديناميكيًا بدل الـ static import
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (!isMounted) return;

      gsap.registerPlugin(ScrollTrigger);
      gsapRef.current = gsap;

      // ⚡ حذفنا الـ scope array اللي كان بيتبعت كـ argument تاني
      // لـ gsap.context، لأنه أصلاً مش شكله الصح (المفروض يكون عنصر
      // DOM واحد مش array)، ومكانش بيأثر على أي حاجة لأن الأنيميشن
      // كله شغال بـ refs مباشرة مش selector text. كود ميت كان بيوهم
      // إنه بيعمل حاجة وهو مش بيعمل أي فرق.
      ctx = gsap.context(() => {
        // ── VIDEO TRANSITION ──
        // ⚡ دمجنا الاثنين fromTo (clipPath + scale) في timeline واحد
        // بـ ScrollTrigger واحد بدل اتنين منفصلين بنفس الـ
        // trigger/start/end/scrub بالظبط. كانوا بيعملوا حسابات وscroll
        // listeners مكررة بلا أي فايدة إضافية.
        gsap
          .timeline({
            scrollTrigger: {
              trigger: videoSectionRef.current,
              start: "top bottom",
              end: "center center",
              scrub: 0.6,
            },
          })
          .fromTo(
            videoWrapRef.current,
            { clipPath: "inset(35% 35% 35% 35% round 16px)" },
            { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none" },
            0
          )
          .fromTo(
            videoRef.current,
            { scale: 1.15 },
            { scale: 1, ease: "none" },
            0
          );

        ScrollTrigger.create({
          trigger: videoSectionRef.current,
          start: "top 60%",
          end: "bottom 40%",
          onEnter: () => videoRef.current?.play(),
          onEnterBack: () => videoRef.current?.play(),
          onLeave: () => videoRef.current?.pause(),
          onLeaveBack: () => videoRef.current?.pause(),
        });

        // ── HEADER: fade + slide up ──
        gsap.fromTo(
          headerEyebrowRef.current,
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: listSectionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // تحريك الحروف المقسمة مسبقاً في JSX
        const titleEl = headerTitleRef.current;
        if (titleEl) {
          const innerSpans = titleEl.querySelectorAll(".char-inner");
          gsap.fromTo(
            innerSpans,
            { y: "100%" },
            {
              y: "0%",
              duration: 0.6,
              ease: "power3.out",
              stagger: 0.04,
              scrollTrigger: {
                trigger: listSectionRef.current,
                start: "top 78%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // ── ROWS ANIMATION ──
        gsap.fromTo(
          rowRefs.current,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: listSectionRef.current,
              start: "top 65%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    })();

    return () => {
      isMounted = false;
      ctx?.revert();
      gsapRef.current = null;
    };
  }, []);

  // ⚡ Lazy-load الفيديو: بدل ما نحط src ثابت في الـ JSX (اللي كان
  // بيبعت طلب شبكة فورًا وقت الـ mount حتى لو السكشن بعيد عن أول
  // الصفحة)، بنستنى لحد ما السكشن يقرب من الشاشة الفعلية عن طريق
  // IntersectionObserver، وبعدين نحط الـ src. ده بيقلل استهلاك
  // الشبكة الأولي ويسيب المجال للموارد الأهم (فونتات/صور فوق) تتحمل
  // الأول.
  useEffect(() => {
    const videoEl = videoRef.current;
    const sectionEl = videoSectionRef.current;
    if (!videoEl || !sectionEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoEl.src = "/videos/video.mp4";
            videoEl.load();
            observer.disconnect();
          }
        });
      },
      { rootMargin: "300px 0px 300px 0px" }
    );

    observer.observe(sectionEl);
    return () => observer.disconnect();
  }, []);

  // إدارة حركات التحويم (Hover) برمجياً عبر دوال React لضمان التنظيف التلقائي
  const handleMouseEnter = (index: number) => {
    const gsap = gsapRef.current;
    if (!gsap) return; // ⚡ حماية: gsap لسه ما اتحملش ديناميكيًا
    const bar = barRefs.current[index];
    const title = titleRefs.current[index];
    if (bar) gsap.to(bar, { opacity: 1, duration: 0.25, ease: "power2.out" });
    if (title) gsap.to(title, { x: 6, duration: 0.3, ease: "power2.out" });
  };

  const handleMouseLeave = (index: number) => {
    const gsap = gsapRef.current;
    if (!gsap) return; // ⚡ حماية: gsap لسه ما اتحملش ديناميكيًا
    const bar = barRefs.current[index];
    const title = titleRefs.current[index];
    if (bar) gsap.to(bar, { opacity: 0, duration: 0.25, ease: "power2.out" });
    if (title) gsap.to(title, { x: 0, duration: 0.3, ease: "power2.out" });
  };

  return (
    <>
      {/* VIDEO SECTION */}
      <section ref={videoSectionRef} className="relative w-full h-[100vh] bg-white">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <div
            ref={videoWrapRef}
            className="relative w-full h-full overflow-hidden"
            style={{ clipPath: "inset(35% 35% 35% 35% round 16px)" }}
          >
            <video
              ref={videoRef}
              // ⚡ الـ src اتشال من هنا ومبقاش بيتحط إلا لما السكشن
              // يقرب من الشاشة (شوف الـ useEffect بتاع IntersectionObserver فوق)
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        </div>
      </section>

      {/* FORMULA SECTION */}
      <section ref={listSectionRef} className="w-full bg-white py-16 md:py-20">
        <Container>
          <div className="flex flex-col gap-2 mb-10 md:mb-14">
            {/* تحسين التباين هنا لتصبح text-gray-600 بدلاً من text-gray-400 */}
            <span
  ref={headerEyebrowRef}
  // ✅ أضفنا willChange
  style={{ opacity: 0, willChange: "opacity, transform" }}
  className="text-label-sm uppercase tracking-widest text-gray-600"
>
  What&apos;s Inside
</span>
            {/* تقسيم الحروف هنا مباشرة في الـ JSX لمنع الـ CLS */}
         <h2
  ref={headerTitleRef}
  className="text-black leading-tight whitespace-nowrap"
  style={{ fontSize: "clamp(50px, 8vw, 72px)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.1 }}
>
              {titleText.split("").map((char, index) =>
                char === " " ? (
                  <span key={index} style={{ display: "inline-block" }}>
                    &nbsp;
                  </span>
                ) : (
                  <span
                    key={index}
                    style={{ display: "inline-block", overflow: "hidden" }}
                  >
                    <span
                      className="char-inner"
                      style={{ display: "inline-block" }}
                    >
                      {char}
                    </span>
                  </span>
                )
              )}
            </h2>
          </div>

          <div className="flex flex-col">
            {INGREDIENTS.map((item, i) => (
              <div
                key={i}
                ref={(el) => {
                  rowRefs.current[i] = el;
                }}
                onMouseEnter={() => handleMouseEnter(i)}
                onMouseLeave={() => handleMouseLeave(i)}
                onTouchStart={() => handleMouseEnter(i)}
                onTouchEnd={() => handleMouseLeave(i)}
                className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 py-7 md:py-9 border-t border-black/10 items-start cursor-pointer select-none"
              >
                <div className="md:col-span-5 flex items-start gap-4">
                  <span
                    ref={(el) => {
                      barRefs.current[i] = el;
                    }}
                    className="block w-[3px] h-7 mt-1 bg-black opacity-0 shrink-0"
                  />
                  <span
                    ref={(el) => {
                      titleRefs.current[i] = el;
                    }}
                    className="text-headline-md text-black leading-snug inline-block"
                  >
                    {item.title}
                  </span>
                </div>

                <div className="md:col-span-7">
                  {/* تحسين التباين هنا لتصبح text-gray-600 بدلاً من text-gray-500 */}
                  <p className="text-body-md text-gray-600 max-w-prose leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}

            <div className="border-t border-black/10" />
          </div>
        </Container>
      </section>
    </>
  );
}