import dynamic from "next/dynamic";
import Hero from "@/sections/Hero/Hero";
import Nutrition from "@/sections/Nutrition/Nutrition";

const MenuSection = dynamic(() => import("@/sections/MenuSection/MenuSection"));
const Vibe = dynamic(() => import("@/sections/Vibe/Vibe"));
const Formula = dynamic(() => import("@/sections/Formula/Formula"));
const Culture = dynamic(() => import("@/sections/Culture/Culture"));

export default function Home() {
  return (
    <>
      <Hero />
      <Nutrition />
      <MenuSection />
      <Vibe />
      <Formula />
      <Culture />
    </>
  );
}