import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import DonutScene from '@/components/3d/DonutScene';
import { useDonutTheme } from '@/context/ThemeContext';

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-20%' });
  const { currentFlavor } = useDonutTheme();

  return (
    <section 
      ref={ref}
      className="relative py-32 overflow-hidden gradient-background"
    >
      {/* Icing drip effect at top */}
      <div className="absolute top-0 left-0 right-0 h-24 overflow-hidden">
        <svg
          viewBox="0 0 1440 100"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,0 L0,50 Q60,80 120,50 T240,50 T360,50 T480,50 T600,50 T720,50 T840,50 T960,50 T1080,50 T1200,50 T1320,50 T1440,50 L1440,0 Z"
            fill="hsl(var(--donut-secondary))"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.3 } : {}}
            transition={{ duration: 0.8 }}
          />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="relative">
          {/* Background donut */}
          <motion.div
            className="absolute -top-32 right-0 w-[400px] h-[400px] opacity-30"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 0.3 } : {}}
            transition={{ duration: 1 }}
          >
            <DonutScene flavor={currentFlavor} className="w-full h-full" />
          </motion.div>

          {/* Content */}
          <motion.div
            className="relative text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="inline-block mb-8"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <span className="text-6xl">🍩</span>
            </motion.div>
            
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-6">
              Taste The{' '}
              <span className="text-gradient">Impossible</span>
            </h2>
            
            <p className="text-xl text-muted-foreground mb-12 max-w-xl mx-auto">
              Join thousands of happy customers who've discovered the magic 
              of our artisanal donuts. Your taste buds will thank you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="btn-liquid px-10 py-5 text-lg font-bold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Order Now
              </motion.button>
              <motion.button
                className="px-10 py-5 text-lg font-semibold rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Find a Store
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
