import { motion } from 'framer-motion';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FourDonutsScene from '@/components/3d/FourDonutsScene';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { Suspense } from 'react';



gsap.registerPlugin(ScrollTrigger, useGSAP);

interface DonutPortalSectionProps {
  nextSectionTitle?: string;
  nextSectionSubtitle?: string;
}

export default function DonutPortalSection({
  nextSectionTitle = "Enter the Sweet Universe",
  nextSectionSubtitle = "Scroll through the donut"
}: DonutPortalSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const donutRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);


  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top top",
        end: "+=150%", // Extended scrolling distance
        scrub: 1, // Smooth interaction
        pin: true,
        anticipatePin: 1
      }
    });

    // Animate Text Fading
    tl.to(textRef.current, { opacity: 1, y: 0, duration: 2, ease: "power2.out" })
      .to(textRef.current, { opacity: 0, y: -50, duration: 2, ease: "power2.in" }, "+=2");

    // Animate Four Donuts Scene
    // "Zoom and Fit": Start MASSIVE (CLose) and scale down to FIT
    tl.fromTo(donutRef.current,
      { scale: 5, z: 2 }, // Really close
      { scale: 1, z: 0, duration: 4, ease: "power2.out" },
      0
    );

    // Vignette / background expansion
    tl.to(portalRef.current, { scale: 3, opacity: 0, duration: 5, ease: "power1.in" }, 0);

    // Final fade out to white/background
    tl.to(overlayRef.current, { opacity: 1, duration: 2 }, "-=2");

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative">
      <div ref={triggerRef} className="h-screen w-full overflow-hidden gradient-background flex items-center justify-center relative">

        {/* Background Portal Glow */}
        <div ref={portalRef} className="absolute w-[80vw] h-[80vw] rounded-full bg-donut-glow/20 blur-3xl pointer-events-none" />

        {/* 3D Scene with 4 Donuts */}
        <div ref={donutRef} className="absolute inset-0 z-10">
          <Canvas
            dpr={1} // Hard cap for max performance
            performance={{ min: 0.8 }} // Allow scaling down quality if needed
            camera={{ position: [0, 0, 10], fov: 50 }}
            style={{ background: 'transparent' }}
            gl={{ alpha: true, antialias: true, powerPreference: "high-performance", stencil: false }}
          >
            <ambientLight intensity={0.8} />
            <directionalLight position={[5, 5, 5]} intensity={1.5} />
            <directionalLight position={[-5, -5, -5]} intensity={0.6} />
            <Suspense fallback={null}>
              <FourDonutsScene />
            </Suspense>
            <Environment preset="studio" />
          </Canvas>
        </div>

        {/* Center Text */}
        <div ref={textRef} className="absolute z-20 flex flex-col items-center text-center opacity-0 translate-y-10 pointer-events-none">
          <span className="text-sm font-medium tracking-widest text-primary uppercase mb-4">
            {nextSectionSubtitle}
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-center">
            <span className="text-gradient">{nextSectionTitle}</span>
          </h2>
        </div>




        {/* Transition Overlay */}
        <div ref={overlayRef} className="absolute inset-0 bg-background opacity-0 pointer-events-none z-30" />
      </div>
    </section>
  );
}
