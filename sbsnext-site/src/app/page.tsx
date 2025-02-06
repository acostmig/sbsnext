import Hero from "@/components/hero";
import HeroSmall from "@/components/hero-small";

export default function Home() {
  return (
    <>
      <Hero className="hidden sm:flex sm:flex-grow sm:flex-col"/>
      <HeroSmall className="md:hidden"/>
    </>
   
  );
}
