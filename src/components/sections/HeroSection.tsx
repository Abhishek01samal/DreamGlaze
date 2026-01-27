import { motion } from 'framer-motion';
import InteractiveDonutScene from '@/components/3d/InteractiveDonutScene';
import SprinkleParticles from '@/components/effects/SprinkleParticles';
import GradientBlobs from '@/components/effects/GradientBlobs';
import SplashDecorations from '@/components/effects/SplashDecorations';


import { useDonutTheme, FLAVOR_ORDER } from '@/context/ThemeContext';
import { DONUT_THEMES } from '@/types/donut';



export default function HeroSection() {
  const { currentFlavor, setFlavor, setAutoCycling, isTransitioning } = useDonutTheme();
  const currentTheme = DONUT_THEMES.find(t => t.id === currentFlavor) || DONUT_THEMES[0];

  const scrollToNext = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  const handleFlavorClick = (flavor: typeof currentFlavor) => {
    setAutoCycling(false);
    setFlavor(flavor);
    setTimeout(() => setAutoCycling(true), 10000);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-background pt-16">
      <GradientBlobs />
      <SprinkleParticles count={35} />
      <SplashDecorations />




      {/* Main content */}
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-8 items-center relative z-10">
        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center lg:text-left"
        >



          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold leading-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Bite Into{' '}
            <motion.span
              className="text-gradient inline-block"
              key={currentFlavor}
              initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              {currentTheme.name.split(' ')[0]}
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {currentTheme.description}. Indulge in our handcrafted,
            artisanal creations that transform every bite into magic.
          </motion.p>

          {/* Quick flavor switcher */}
          <motion.div
            className="flex gap-3 justify-center lg:justify-start mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {FLAVOR_ORDER.map((flavor, index) => {
              const isActive = currentFlavor === flavor;
              return (
                <motion.button
                  key={flavor}
                  onClick={() => handleFlavorClick(flavor)}
                  className="relative"
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <motion.div
                    className={`w-10 h-10 rounded-full transition-all duration-300 ${isActive ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : 'opacity-60'
                      }`}
                    style={{
                      background: `linear-gradient(135deg, 
                        hsl(${flavor === 'pink' ? '340 75% 65%' : flavor === 'blue' ? '175 70% 50%' : flavor === 'yellow' ? '48 90% 55%' : '270 60% 58%'}) 0%,
                        hsl(${flavor === 'pink' ? '350 80% 75%' : flavor === 'blue' ? '180 65% 60%' : flavor === 'yellow' ? '45 85% 65%' : '280 55% 68%'}) 100%
                      )`,
                    }}
                    animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                </motion.button>
              );
            })}
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.button
              className="btn-liquid px-8 py-4 text-lg font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore Flavors
            </motion.button>
            <motion.button
              className="px-8 py-4 text-lg font-semibold rounded-full border-2 border-border hover:border-primary hover:bg-primary/5 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              Our Story
            </motion.button>
          </motion.div>
        </motion.div>

        {/* 3D Donut - Much larger with interactive controls */}
        <motion.div
          className="relative h-[450px] md:h-[550px] lg:h-[650px]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Animated glow rings */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <div
              className="w-[80%] h-[80%] rounded-full"
              style={{
                background: `conic-gradient(from 0deg, 
                  transparent 0%, 
                  hsla(var(--donut-glow), 0.3) 25%, 
                  transparent 50%,
                  hsla(var(--donut-glow), 0.3) 75%,
                  transparent 100%
                )`,
              }}
            />
          </motion.div>

          <div className="absolute inset-0 donut-glow">
            <InteractiveDonutScene flavor={currentFlavor} className="w-full h-full" />
          </div>
        </motion.div>
      </div>








    </section>
  );
}
