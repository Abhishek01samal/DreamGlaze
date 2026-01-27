import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { useDonutTheme } from '@/context/ThemeContext';

interface SplashDecorationsProps {
  className?: string;
}

export default function SplashDecorations({ className }: SplashDecorationsProps) {
  const { currentFlavor } = useDonutTheme();
  
  const splashes = useMemo(() => [
    { x: '5%', y: '15%', size: 80, rotation: -15, delay: 0 },
    { x: '85%', y: '25%', size: 100, rotation: 25, delay: 0.3 },
    { x: '10%', y: '70%', size: 70, rotation: 45, delay: 0.6 },
    { x: '90%', y: '75%', size: 90, rotation: -30, delay: 0.9 },
    { x: '50%', y: '5%', size: 60, rotation: 10, delay: 0.2 },
    { x: '45%', y: '90%', size: 75, rotation: -20, delay: 0.5 },
  ], []);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {splashes.map((splash, index) => (
        <motion.div
          key={`splash-${currentFlavor}-${index}`}
          className="absolute"
          style={{
            left: splash.x,
            top: splash.y,
            width: splash.size,
            height: splash.size,
            transform: `rotate(${splash.rotation}deg)`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.2, 0.4, 0.2],
            scale: [0.9, 1.1, 0.9],
          }}
          transition={{
            duration: 4,
            delay: splash.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {/* Splash shape using SVG */}
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <radialGradient id={`splash-gradient-${currentFlavor}-${index}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" className="text-donut-glow" style={{ stopColor: 'currentColor' }} />
                <stop offset="70%" className="text-donut-primary" style={{ stopColor: 'currentColor' }} />
                <stop offset="100%" className="text-donut-secondary" style={{ stopColor: 'currentColor', stopOpacity: 0.5 }} />
              </radialGradient>
            </defs>
            <ellipse 
              cx="50" 
              cy="50" 
              rx="40" 
              ry="35" 
              fill={`url(#splash-gradient-${currentFlavor}-${index})`}
              className="transition-all duration-700"
            />
            {/* Splash droplets */}
            <circle cx="25" cy="25" r="8" className="fill-donut-primary/50 transition-colors duration-700" />
            <circle cx="75" cy="30" r="6" className="fill-donut-secondary/60 transition-colors duration-700" />
            <circle cx="30" cy="75" r="7" className="fill-donut-glow/50 transition-colors duration-700" />
            <circle cx="70" cy="70" r="5" className="fill-donut-accent/70 transition-colors duration-700" />
            <circle cx="15" cy="50" r="4" className="fill-donut-primary/40 transition-colors duration-700" />
            <circle cx="85" cy="55" r="5" className="fill-donut-secondary/50 transition-colors duration-700" />
          </svg>
        </motion.div>
      ))}
      
      {/* Drip drops animation */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`drop-${currentFlavor}-${i}`}
          className="absolute rounded-full bg-donut-primary transition-colors duration-700"
          style={{
            width: 10 + Math.random() * 8,
            height: 14 + Math.random() * 10,
            left: `${10 + i * 12}%`,
            borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%',
            boxShadow: '0 2px 8px hsla(var(--donut-primary), 0.4)',
          }}
          initial={{ top: '-5%', opacity: 0 }}
          animate={{
            top: ['0%', '105%'],
            opacity: [0, 1, 1, 0],
            scale: [0.5, 1, 1, 0.8],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            delay: i * 1.2 + Math.random() * 2,
            repeat: Infinity,
            ease: 'easeIn',
          }}
        />
      ))}
    </div>
  );
}
