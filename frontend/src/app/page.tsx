import { FeaturesSection } from "@/components/LandingPage/FeaturesSection";
import { Footer } from "@/components/LandingPage/Footer";
import { HeroSection } from "@/components/LandingPage/HeroSection";
import { Navbar } from "@/components/LandingPage/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <FeaturesSection/>
      <Footer/>
    </div>
  );
}
