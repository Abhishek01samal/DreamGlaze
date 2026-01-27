import { motion, AnimatePresence } from 'framer-motion';
import { useDonutTheme, FLAVOR_ORDER } from '@/context/ThemeContext';
import { DONUT_THEMES, DonutFlavor } from '@/types/donut';
import { Canvas } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import DonutModel from '@/components/3d/DonutModel';

export default function DonutSelector() {
  const { currentFlavor, setFlavor, setAutoCycling, rotationDirection } = useDonutTheme();
  const currentTheme = DONUT_THEMES.find(t => t.id === currentFlavor)!;

  const handleFlavorClick = (flavor: DonutFlavor) => {
    setFlavor(flavor);
  };

  return (
    <div className="w-full">
      {/* Flavor selector buttons with enhanced styling */}
      <div className="flex justify-center gap-4 mb-12">
        {DONUT_THEMES.map((theme, index) => {
          const isActive = currentFlavor === theme.id;

          return (
            <motion.button
              key={theme.id}
              onClick={() => handleFlavorClick(theme.id)}
              className="relative group"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Glow effect behind */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `radial-gradient(circle, hsla(${theme.id === 'pink' ? 340 : theme.id === 'blue' ? 175 : theme.id === 'yellow' ? 48 : 270}, 80%, 60%, 0.5) 0%, transparent 70%)`,
                }}
                animate={isActive ? { scale: [1.2, 1.5, 1.2], opacity: [0.5, 0.8, 0.5] } : { scale: 1, opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              <div
                className={`relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden transition-all duration-500 scale-100 hover:scale-105`}
                style={{
                  boxShadow: isActive
                    ? `0 0 30px hsla(var(--donut-glow), 0.6), 0 0 60px hsla(var(--donut-primary), 0.3)`
                    : 'none'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-secondary to-muted" />
                <Canvas
                  camera={{ position: [0, 0, 5], fov: 50 }}
                  style={{ background: 'transparent' }}
                  gl={{ alpha: true }}
                >
                  <ambientLight intensity={0.8} />
                  <directionalLight position={[5, 5, 5]} intensity={0.8} />
                  <Float speed={isActive ? 4 : 2} rotationIntensity={isActive ? 0.5 : 0.2} floatIntensity={0.3}>
                    <DonutModel
                      modelPath={theme.modelPath}
                      scale={2.8}
                      position={[0, 0, 0]}
                      rotationSpeed={isActive ? 0.6 : 0.3}
                      floatIntensity={0}
                    />
                  </Float>
                  <Environment preset="studio" />
                </Canvas>
              </div>

              {/* Label on hover */}
              <motion.div
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <span className="text-xs font-medium text-muted-foreground">{theme.name}</span>
              </motion.div>

              {/* Ripple effect on active */}


            </motion.button>
          );
        })}
      </div>

      {/* Selected flavor info with enhanced animations */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentFlavor}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.95 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >


          <motion.h3
            className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 text-gradient"
            initial={{ opacity: 0, rotateX: -20 }}
            animate={{ opacity: 1, rotateX: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            {currentTheme.name}
          </motion.h3>
          <motion.p
            className="text-muted-foreground max-w-md mx-auto text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {currentTheme.description}
          </motion.p>

          <motion.button
            className="mt-8 btn-liquid px-8 py-3 font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Order {currentTheme.name}
          </motion.button>
        </motion.div>
      </AnimatePresence>
    </div >
  );
}
