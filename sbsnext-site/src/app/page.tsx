import Hero from "@/components/hero";
import HeroSmall from "@/components/hero-small";

export default function Home() {
  return (
    <>
      <Hero className="hidden mt-20 sm:flex sm:flex-grow sm:flex-col"/>
      <HeroSmall className="sm:hidden"/>
    </>
   
  );
}
