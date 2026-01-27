import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useDonutTheme } from '@/context/ThemeContext';
import { DONUT_THEMES } from '@/types/donut';

export default function StorySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-20%' });
  const { currentFlavor } = useDonutTheme();
  const currentTheme = DONUT_THEMES.find(t => t.id === currentFlavor) || DONUT_THEMES[0];

  return (
    <section 
      ref={ref}
      className="relative py-20 overflow-hidden gradient-background"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-1/2 -right-1/4 w-[80vw] h-[80vw] rounded-full"
          style={{
            background: `radial-gradient(circle, hsla(var(--donut-glow), 0.1) 0%, transparent 60%)`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-1/2 -left-1/4 w-[60vw] h-[60vw] rounded-full"
          style={{
            background: `radial-gradient(circle, hsla(var(--donut-primary), 0.08) 0%, transparent 60%)`,
          }}
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -10, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, delay: 3 }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden glass-card p-8">
              {/* Animated donut-shaped decorations */}
              <motion.div
                className="absolute top-8 left-8 w-24 h-24 rounded-full"
                style={{
                  background: `linear-gradient(135deg, hsla(var(--donut-primary), 0.8) 0%, hsla(var(--donut-secondary), 0.8) 100%)`,
                  boxShadow: '0 10px 40px hsla(var(--donut-glow), 0.4)',
                }}
                animate={{ 
                  scale: [1, 1.1, 1], 
                  rotate: [0, 360],
                  y: [0, -10, 0],
                }}
                transition={{ duration: 8, repeat: Infinity }}
              >
                {/* Donut hole */}
                <div className="absolute inset-1/4 rounded-full bg-gradient-to-br from-background to-secondary" />
              </motion.div>
              
              <motion.div
                className="absolute bottom-12 right-12 w-36 h-36 rounded-full"
                style={{
                  background: `linear-gradient(135deg, hsla(var(--donut-secondary), 0.7) 0%, hsla(var(--donut-glow), 0.7) 100%)`,
                  boxShadow: '0 15px 50px hsla(var(--donut-primary), 0.3)',
                }}
                animate={{ 
                  scale: [1, 1.15, 1], 
                  rotate: [0, -360],
                  y: [0, 15, 0],
                }}
                transition={{ duration: 10, repeat: Infinity, delay: 1 }}
              >
                <div className="absolute inset-1/4 rounded-full bg-gradient-to-br from-background to-secondary" />
              </motion.div>
              
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full"
                style={{
                  background: `linear-gradient(135deg, hsla(var(--donut-glow), 0.6) 0%, hsla(var(--donut-accent), 0.6) 100%)`,
                  boxShadow: '0 20px 60px hsla(var(--donut-glow), 0.4)',
                }}
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{ duration: 12, repeat: Infinity, delay: 2 }}
              >
                <div className="absolute inset-1/4 rounded-full bg-gradient-to-br from-background to-secondary" />
              </motion.div>
              
              {/* Central text element */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  className="text-center"
                  key={currentFlavor}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-7xl md:text-8xl font-display font-bold text-gradient opacity-30">
                    SWEET
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.span 
              className="inline-block text-sm font-medium tracking-widest text-primary uppercase mb-4"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Our Story
            </motion.span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              Crafted With{' '}
              <motion.span 
                className="text-gradient inline-block"
                key={currentFlavor}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Passion
              </motion.span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed">
              Every donut we create is a celebration of color, taste, and joy. 
              Our artisans spend hours perfecting each flavor, ensuring that 
              every bite delivers an unforgettable experience.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              From the perfect glaze to the vibrant sprinkles, we believe that 
              food should be as beautiful as it is delicious.
            </p>
            
            <motion.button
              className="btn-liquid px-8 py-4 font-semibold text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
