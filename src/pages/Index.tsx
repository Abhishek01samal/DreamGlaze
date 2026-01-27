import { ThemeProvider } from '@/context/ThemeContext';
import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import DonutPortalSection from '@/components/sections/DonutPortalSection';
// import HalfDonutSection from '@/components/sections/HalfDonutSection';
import InteractiveSection from '@/components/sections/InteractiveSection';
import ShowcaseSection from '@/components/sections/ShowcaseSection';
import StorySection from '@/components/sections/StorySection';
import Footer from '@/components/sections/Footer';
// import DrippingIcing from '@/components/effects/DrippingIcing';
import ChocolateBalls from '@/components/effects/ChocolateBalls';
import SweetTexture from '@/components/effects/SweetTexture';
import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Index = () => {
  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2, // Reduced from 2.0 for more responsive feeling
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0, // Standard multiplier
      touchMultiplier: 2.0, // Smoother touch
    });

    function raf(time: number) {
      lenis.raf(time);
      ScrollTrigger.update(); // Sync GSAP ScrollTrigger
      requestAnimationFrame(raf);
    }

    // Connect Lenis to GSAP
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000); // GSAP uses seconds, Lenis uses ms
    });

    // Disable GSAP's native ticker for scroll handling to avoid conflicts
    gsap.ticker.lagSmoothing(0);

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
  return (
    <ThemeProvider>
      <div className="min-h-screen overflow-x-hidden relative" data-theme="blue">


        {/* Global texture overlay */}
        <SweetTexture className="fixed z-0 opacity-30" />

        {/* Floating chocolate balls */}
        <ChocolateBalls count={20} className="fixed z-0 opacity-40" />

        <Navbar />
        <main className="relative z-10">
          <HeroSection />
          <DonutPortalSection
            nextSectionTitle="Enter the Flavor Zone"
            nextSectionSubtitle="Scroll through the donut"
          />
          {/* <HalfDonutSection /> */}
          <InteractiveSection />
          <ShowcaseSection />
          <StorySection />
        </main>
        <Footer />


      </div>
    </ThemeProvider>
  );
};

export default Index;
