import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import DonutSelector from './DonutSelector';
import InteractiveDonutScene from '@/components/3d/InteractiveDonutScene';
import { useDonutTheme } from '@/context/ThemeContext';
import { DONUT_THEMES } from '@/types/donut';

export default function InteractiveSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-20%' });
  const { currentFlavor, isTransitioning, rotationDirection } = useDonutTheme();
  const currentTheme = DONUT_THEMES.find(t => t.id === currentFlavor) || DONUT_THEMES[0];

  return (
    <section
      ref={ref}
      className="relative min-h-screen py-16 flex items-center gradient-background overflow-hidden"
    >
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-1/4 w-[50vw] h-[50vw] rounded-full"
          style={{
            background: `radial-gradient(circle, hsla(var(--donut-primary), 0.15) 0%, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-1/4 w-[40vw] h-[40vw] rounded-full"
          style={{
            background: `radial-gradient(circle, hsla(var(--donut-glow), 0.2) 0%, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -20, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <motion.span
            className="inline-block text-sm font-medium tracking-widest text-primary uppercase mb-4"
            key={currentFlavor + '-choose'}
          >
            Choose Your Flavor
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold">
            Pick Your{' '}
            <motion.span
              className="text-gradient inline-block"
              key={currentFlavor}
              initial={{ opacity: 0, y: 20, rotateX: -20 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              {currentTheme.name}
            </motion.span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Large 3D Donut Display with interactive controls */}
          <motion.div
            className="relative h-[450px] md:h-[550px] lg:h-[600px] order-2 lg:order-1"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Rotating glow ring */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              animate={{ rotate: rotationDirection === 'forward' ? 360 : -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
              <div
                className="w-[85%] h-[85%] rounded-full"
                style={{
                  background: `conic-gradient(from 0deg, 
                    hsla(var(--donut-primary), 0.2) 0%,
                    hsla(var(--donut-glow), 0.4) 25%,
                    hsla(var(--donut-secondary), 0.2) 50%,
                    hsla(var(--donut-glow), 0.4) 75%,
                    hsla(var(--donut-primary), 0.2) 100%
                  )`,
                  filter: 'blur(30px)',
                }}
              />
            </motion.div>

            <div className="absolute inset-0 donut-glow">
              <InteractiveDonutScene flavor={currentFlavor} className="w-full h-full" />
            </div>

            {/* Flavor label */}


          </motion.div>

          {/* Selector */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <DonutSelector />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
