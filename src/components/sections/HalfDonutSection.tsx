import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import FrontDonutScene from '@/components/3d/FrontDonutScene';
import { useDonutTheme, FLAVOR_ORDER } from '@/context/ThemeContext';
import { DONUT_THEMES, DonutFlavor } from '@/types/donut';

function useMotionValueState(value: MotionValue<number>) {
  const [state, setState] = useState(value.get());
  useEffect(() => {
    return value.on("change", setState);
  }, [value]);
  return state;
}

export default function HalfDonutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { currentFlavor, setFlavor, rotationDirection, isTransitioning, setAutoCycling } = useDonutTheme();
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  const textX = useTransform(scrollYProgress, [0, 0.2], [-50, 0]);
  const donutX = useTransform(scrollYProgress, [0, 0.2], [100, 0]);
  
  const currentTheme = DONUT_THEMES.find(t => t.id === currentFlavor) || DONUT_THEMES[0];

  const handleFlavorClick = (flavor: DonutFlavor) => {
    setAutoCycling(false);
    setFlavor(flavor);
    setTimeout(() => setAutoCycling(true), 10000);
  };

  return (
    <section 
      ref={ref}
      className="relative min-h-[150vh] overflow-hidden"
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex items-center gradient-background overflow-hidden">
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 10 + 5,
                height: Math.random() * 10 + 5,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `hsla(var(--donut-${['primary', 'secondary', 'glow'][i % 3]}), ${0.2 + Math.random() * 0.3})`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Half-page split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full h-full">
          {/* Left side - Text content */}
          <motion.div 
            className="flex flex-col justify-center px-8 lg:px-16 order-2 lg:order-1 relative z-10"
            style={{ opacity, x: textX }}
          >
            <motion.span 
              className="text-sm font-medium tracking-widest text-primary uppercase mb-4"
              style={{ scale }}
              key={currentFlavor + '-tag'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Experience the Flavor
            </motion.span>
            
            <motion.h2 
              className="text-5xl md:text-6xl lg:text-8xl font-display font-bold mb-6"
              style={{ scale }}
              key={currentFlavor + '-name'}
              initial={{ opacity: 0, y: 30, rotateX: -15 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              <span className="text-gradient">{currentTheme.name}</span>
            </motion.h2>
            
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground max-w-md mb-8"
              style={{ scale }}
              key={currentFlavor + '-desc'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {currentTheme.description}
            </motion.p>
            
            <motion.div style={{ scale }}>
              <motion.span 
                className="inline-block px-8 py-4 rounded-full bg-primary/10 text-primary font-semibold text-lg"
                key={currentFlavor + '-tagline'}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                {currentTheme.tagline}
              </motion.span>
            </motion.div>
            
            {/* Flavor indicators with enhanced styling */}
            <div className="flex gap-4 mt-12">
              {FLAVOR_ORDER.map((flavor, index) => {
                const isActive = currentFlavor === flavor;
                const theme = DONUT_THEMES.find(t => t.id === flavor)!;
                
                return (
                  <motion.button
                    key={flavor}
                    onClick={() => handleFlavorClick(flavor)}
                    className="relative group"
                    whileHover={{ scale: 1.2, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <motion.div
                      className={`w-12 h-12 rounded-full transition-all duration-500 flex items-center justify-center ${
                        isActive 
                          ? 'ring-4 ring-primary ring-offset-4 ring-offset-background' 
                          : 'opacity-50 hover:opacity-100'
                      }`}
                      style={{
                        background: `linear-gradient(135deg, 
                          hsl(${flavor === 'pink' ? '340 75% 65%' : flavor === 'blue' ? '175 70% 50%' : flavor === 'yellow' ? '48 90% 55%' : '270 60% 58%'}) 0%,
                          hsl(${flavor === 'pink' ? '350 80% 75%' : flavor === 'blue' ? '180 65% 60%' : flavor === 'yellow' ? '45 85% 65%' : '280 55% 68%'}) 100%
                        )`,
                      }}
                      animate={isActive ? {
                        boxShadow: [
                          '0 0 20px hsla(var(--donut-glow), 0.4)',
                          '0 0 40px hsla(var(--donut-glow), 0.7)',
                          '0 0 20px hsla(var(--donut-glow), 0.4)',
                        ]
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <span className="text-white font-bold">{theme.name.charAt(0)}</span>
                    </motion.div>
                    
                    {/* Ripple effect on active */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-primary"
                        initial={{ scale: 1, opacity: 1 }}
                        animate={{ scale: 2, opacity: 0 }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Right side - Large front-facing donut */}
          <motion.div 
            className="relative h-full order-1 lg:order-2 overflow-visible"
            style={{ opacity, x: donutX }}
          >
            {/* Massive glow effect */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              <div 
                className="w-[140%] h-[140%] rounded-full"
                style={{
                  background: `conic-gradient(
                    from 0deg,
                    hsla(var(--donut-primary), 0.2) 0%,
                    hsla(var(--donut-glow), 0.4) 25%,
                    hsla(var(--donut-secondary), 0.2) 50%,
                    hsla(var(--donut-glow), 0.4) 75%,
                    hsla(var(--donut-primary), 0.2) 100%
                  )`,
                  filter: 'blur(60px)',
                }}
              />
            </motion.div>

            {/* Radial glow */}
            <div 
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div 
                className="w-[120%] h-[120%] rounded-full"
                style={{
                  background: `radial-gradient(circle, hsla(var(--donut-glow), 0.3) 0%, transparent 60%)`,
                }}
              />
            </div>
            
            <div className="absolute inset-0 donut-glow">
              <FrontDonutScene 
                flavor={currentFlavor}
                rotationDirection={rotationDirection}
                isTransitioning={isTransitioning}
                className="w-full h-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
