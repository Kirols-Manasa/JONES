import Hero from "@/sections/Hero/Hero";
import Nutrition from "@/sections/Nutrition/Nutrition";
import MenuSection from "@/sections/MenuSection/MenuSection";
import Vibe from "@/sections/Vibe/Vibe";
import Formula from "@/sections/Formula/Formula";
import Culture from "@/sections/Culture/Culture";

export default function Home() {
  return (
    <main>
      <Hero />
      <Nutrition/>
      <MenuSection />
       <Vibe />
      <Formula />
      <Culture />
    </main>
  );
}