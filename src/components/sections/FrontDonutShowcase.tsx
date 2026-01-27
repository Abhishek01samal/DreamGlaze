import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import FrontDonutScene from '@/components/3d/FrontDonutScene';
import { useDonutTheme, FLAVOR_ORDER } from '@/context/ThemeContext';
import { DONUT_THEMES } from '@/types/donut';

export default function FrontDonutShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-20%' });
  const { currentFlavor, setFlavor, rotationDirection, isTransitioning, setAutoCycling } = useDonutTheme();

  const currentTheme = DONUT_THEMES.find(t => t.id === currentFlavor) || DONUT_THEMES[0];

  const handleFlavorClick = (flavor: typeof currentFlavor) => {
    setAutoCycling(false); // Pause auto-cycling on user interaction
    setFlavor(flavor);
    // Resume after 10 seconds of inactivity
    setTimeout(() => setAutoCycling(true), 10000);
  };

  return (
    <section 
      ref={ref}
      className="relative min-h-screen py-16 overflow-hidden gradient-background"
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-1/4 -right-1/4 w-[60vw] h-[60vw] rounded-full opacity-30"
          style={{
            background: `radial-gradient(circle, hsla(var(--donut-glow), 0.4) 0%, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-1/4 -left-1/4 w-[50vw] h-[50vw] rounded-full opacity-20"
          style={{
            background: `radial-gradient(circle, hsla(var(--donut-secondary), 0.5) 0%, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[80vh]">
          {/* 3D Donut - Front facing, rotating */}
          <motion.div
            className="relative h-[500px] md:h-[600px] lg:h-[700px] order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
            animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Glow ring behind donut */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div 
                className="w-[90%] h-[90%] rounded-full"
                style={{
                  background: `conic-gradient(
                    from 0deg,
                    hsla(var(--donut-primary), 0.3) 0%,
                    hsla(var(--donut-glow), 0.5) 25%,
                    hsla(var(--donut-secondary), 0.3) 50%,
                    hsla(var(--donut-glow), 0.5) 75%,
                    hsla(var(--donut-primary), 0.3) 100%
                  )`,
                  filter: 'blur(40px)',
                }}
              />
            </motion.div>

            <div className="absolute inset-0 donut-glow">
              <FrontDonutScene 
                flavor={currentFlavor}
                rotationDirection={rotationDirection}
                isTransitioning={isTransitioning}
                className="w-full h-full" 
              />
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div 
            className="order-2 lg:order-1 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.span 
              className="inline-block text-sm font-medium tracking-widest text-primary uppercase mb-4"
              key={currentFlavor + '-tag'}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {currentTheme.tagline}
            </motion.span>
            
            <motion.h2 
              className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6"
              key={currentFlavor + '-title'}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            >
              <span className="text-gradient">{currentTheme.name}</span>
            </motion.h2>
            
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0 mb-8"
              key={currentFlavor + '-desc'}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {currentTheme.description}
            </motion.p>

            {/* Flavor selector with animated indicators */}
            <div className="flex gap-4 justify-center lg:justify-start mb-8">
              {FLAVOR_ORDER.map((flavor, index) => {
                const theme = DONUT_THEMES.find(t => t.id === flavor)!;
                const isActive = currentFlavor === flavor;
                
                return (
                  <motion.button
                    key={flavor}
                    onClick={() => handleFlavorClick(flavor)}
                    className="relative group"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <motion.div
                      className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 ${
                        isActive 
                          ? 'ring-4 ring-primary ring-offset-4 ring-offset-background scale-110' 
                          : 'opacity-60 hover:opacity-100'
                      }`}
                      style={{
                        background: `linear-gradient(135deg, 
                          hsl(${flavor === 'pink' ? '340 75% 65%' : flavor === 'blue' ? '175 70% 50%' : flavor === 'yellow' ? '48 90% 55%' : '270 60% 58%'}) 0%,
                          hsl(${flavor === 'pink' ? '350 80% 75%' : flavor === 'blue' ? '180 65% 60%' : flavor === 'yellow' ? '45 85% 65%' : '280 55% 68%'}) 100%
                        )`,
                      }}
                      animate={isActive ? { 
                        boxShadow: [
                          '0 0 20px hsla(var(--donut-glow), 0.5)',
                          '0 0 40px hsla(var(--donut-glow), 0.8)',
                          '0 0 20px hsla(var(--donut-glow), 0.5)'
                        ]
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <span className="text-white font-bold text-lg">
                        {theme.name.charAt(0)}
                      </span>
                    </motion.div>
                    
                    {/* Tooltip */}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      <span className="text-xs text-muted-foreground">{theme.name}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <motion.button
              className="btn-liquid px-8 py-4 text-lg font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Order Now
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Auto-cycle indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {FLAVOR_ORDER.map((flavor, index) => (
          <motion.div
            key={flavor}
            className="h-1 rounded-full transition-all duration-500"
            style={{
              width: currentFlavor === flavor ? '2rem' : '0.5rem',
              backgroundColor: currentFlavor === flavor 
                ? 'hsl(var(--primary))' 
                : 'hsl(var(--muted-foreground) / 0.3)',
            }}
          />
        ))}
      </motion.div>
    </section>
  );
}
