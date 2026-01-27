import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { useDonutTheme } from '@/context/ThemeContext';
import { DONUT_THEMES, DonutFlavor } from '@/types/donut';
import DonutScene from '@/components/3d/DonutScene';

export default function FlavorJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setFlavor, currentFlavor } = useDonutTheme();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const activeIndex = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, 0, 1, 2, 3]);

  useEffect(() => {
    const unsubscribe = activeIndex.on('change', (latest) => {
      const index = Math.round(latest);
      const flavor = DONUT_THEMES[index]?.id;
      if (flavor && flavor !== currentFlavor) {
        setFlavor(flavor as DonutFlavor);
      }
    });
    return () => unsubscribe();
  }, [activeIndex, setFlavor, currentFlavor]);

  return (
    <section ref={containerRef} className="relative" style={{ height: '400vh' }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden gradient-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text content that changes with scroll */}
            <div className="text-center lg:text-left">
              <motion.span
                className="inline-block text-sm font-medium tracking-widest text-primary uppercase mb-4"
              >
                Flavor Journey
              </motion.span>
              
              {DONUT_THEMES.map((theme, index) => {
                const opacity = useTransform(
                  scrollYProgress,
                  [
                    index * 0.25,
                    index * 0.25 + 0.1,
                    (index + 1) * 0.25 - 0.1,
                    (index + 1) * 0.25,
                  ],
                  [0, 1, 1, 0]
                );
                
                const y = useTransform(
                  scrollYProgress,
                  [index * 0.25, index * 0.25 + 0.1],
                  [30, 0]
                );

                return (
                  <motion.div
                    key={theme.id}
                    className="absolute"
                    style={{ opacity, y }}
                  >
                    <h2 className="text-4xl md:text-6xl font-display font-bold mb-4 text-gradient">
                      {theme.name}
                    </h2>
                    <p className="text-xl text-muted-foreground mb-2">
                      {theme.tagline}
                    </p>
                    <p className="text-lg text-muted-foreground/80 max-w-md">
                      {theme.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* 3D Donut that changes */}
            <motion.div
              className="relative h-[400px] md:h-[500px]"
              style={{
                scale: useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1]),
              }}
            >
              <div className="absolute inset-0 donut-glow">
                <DonutScene flavor={currentFlavor} className="w-full h-full" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3">
          {DONUT_THEMES.map((theme, index) => {
            const isActive = useTransform(
              scrollYProgress,
              [index * 0.25, (index + 1) * 0.25],
              [0, 1]
            );
            
            return (
              <motion.div
                key={theme.id}
                className="w-3 h-3 rounded-full border-2 border-primary transition-all duration-300"
                style={{
                  backgroundColor: useTransform(isActive, (v) => 
                    v > 0.5 ? 'hsl(var(--primary))' : 'transparent'
                  ),
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
