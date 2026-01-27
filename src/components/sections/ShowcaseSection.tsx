import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import MultiDonutScene from '@/components/3d/MultiDonutScene';
import { useDonutTheme } from '@/context/ThemeContext';
import { DONUT_THEMES } from '@/types/donut';

export default function ShowcaseSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-10%' });
  const { currentFlavor, rotationDirection } = useDonutTheme();
  const currentTheme = DONUT_THEMES.find(t => t.id === currentFlavor) || DONUT_THEMES[0];

  return (
    <section 
      ref={ref}
      className="relative min-h-screen py-16 overflow-hidden gradient-background"
    >
      {/* Animated background gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 80% 50% at 50% 50%, hsla(var(--donut-glow), 0.15) 0%, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      {/* 3D Showcase */}
      <div className="absolute inset-0 opacity-80">
        <MultiDonutScene className="w-full h-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span 
            className="inline-block text-sm font-medium tracking-widest text-primary uppercase mb-4"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            The Collection
          </motion.span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6">
            Every Flavor,{' '}
            <motion.span 
              className="text-gradient inline-block"
              key={currentFlavor}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring" }}
            >
              One Universe
            </motion.span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Four unique flavors, infinite possibilities. Each donut is a carefully 
            crafted masterpiece that brings color and joy to your day.
          </p>
        </motion.div>

        {/* Stats with enhanced animations */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-24"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {[
            { value: '4', label: 'Unique Flavors' },
            { value: '100%', label: 'Handcrafted' },
            { value: '∞', label: 'Joy Delivered' },
            { value: '24/7', label: 'Fresh Baked' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="relative text-center glass-card p-6 md:p-8 rounded-2xl overflow-hidden group"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              {/* Background glow on hover */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: `radial-gradient(circle at center, hsla(var(--donut-glow), 0.2) 0%, transparent 70%)`,
                }}
              />
              
              <motion.div 
                className="relative text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gradient mb-2"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
              >
                {stat.value}
              </motion.div>
              <div className="relative text-sm text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `hsla(var(--donut-${['primary', 'secondary', 'glow'][i % 3]}), 0.6)`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [Math.random() * 20 - 10, Math.random() * 20 - 10],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </section>
  );
}
